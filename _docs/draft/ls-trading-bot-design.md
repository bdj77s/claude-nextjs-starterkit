# LS증권 Open API 자동 매매 봇 시스템 설계서

## 1. 시스템 아키텍처 개요

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Next.js Frontend                              │
│                   (대시보드, 모니터링, 전략 관리)                        │
└─────────────────────────────┬───────────────────────────────────────┘
                              │ REST API / WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        FastAPI Backend                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Order     │  │  Strategy   │  │  Position   │  │    Risk     │ │
│  │  Manager    │  │   Engine    │  │  Manager    │  │   Manager   │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘ │
│         │                │                │                │        │
│         └────────────────┴────────────────┴────────────────┘        │
│                                   │                                  │
│                          ┌────────▼────────┐                        │
│                          │   Event Bus     │                        │
│                          │   (Observer)    │                        │
│                          └────────┬────────┘                        │
│                                   │                                  │
│                          ┌────────▼────────┐                        │
│                          │  LS API Client  │                        │
│                          │  (OAuth 2.0)    │                        │
│                          └────────┬────────┘                        │
└───────────────────────────────────┼─────────────────────────────────┘
                                    │ HTTPS
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    LS증권 Open API Server                            │
│                 https://openapi.ebestsec.co.kr:8080                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. 패키지 구조

```
trading_bot/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI 앱 엔트리포인트
│   ├── config.py                  # 설정 관리 (Singleton)
│   └── dependencies.py            # 의존성 주입
├── api/
│   ├── __init__.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── orders.py              # 주문 관련 API
│   │   ├── positions.py           # 포지션 관련 API
│   │   ├── strategies.py          # 전략 관련 API
│   │   ├── account.py             # 계좌 관련 API
│   │   ├── market.py              # 시장 데이터 API
│   │   └── health.py              # 헬스체크
│   └── websocket/
│       ├── __init__.py
│       └── realtime.py            # 실시간 데이터 WebSocket
├── core/
│   ├── __init__.py
│   ├── client/
│   │   ├── __init__.py
│   │   ├── base.py                # 기본 HTTP 클라이언트
│   │   ├── auth.py                # OAuth 인증 관리
│   │   └── ls_client.py           # LS증권 API 클라이언트
│   ├── trading/
│   │   ├── __init__.py
│   │   ├── order_manager.py       # 주문 관리자
│   │   ├── position_manager.py    # 포지션 관리자
│   │   └── risk_manager.py        # 리스크 관리자
│   ├── strategy/
│   │   ├── __init__.py
│   │   ├── base.py                # 전략 기본 인터페이스
│   │   ├── engine.py              # 전략 엔진
│   │   └── strategies/
│   │       ├── __init__.py
│   │       ├── moving_average.py  # 이동평균 전략
│   │       ├── rsi.py             # RSI 전략
│   │       └── macd.py            # MACD 전략
│   └── events/
│       ├── __init__.py
│       ├── event_bus.py           # 이벤트 버스 (Observer)
│       └── handlers.py            # 이벤트 핸들러
├── models/
│   ├── __init__.py
│   ├── order.py                   # 주문 모델
│   ├── position.py                # 포지션 모델
│   ├── account.py                 # 계좌 모델
│   ├── strategy.py                # 전략 모델
│   └── market.py                  # 시장 데이터 모델
├── factories/
│   ├── __init__.py
│   └── order_factory.py           # 주문 팩토리 (Factory Pattern)
├── utils/
│   ├── __init__.py
│   ├── logger.py                  # 로깅 유틸리티
│   ├── decorators.py              # 데코레이터
│   └── helpers.py                 # 헬퍼 함수
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_client.py
│   ├── test_orders.py
│   └── test_strategies.py
├── requirements.txt
├── pyproject.toml
├── .env.example
└── README.md
```

---

## 3. 클래스 다이어그램

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              <<Singleton>>                                   │
│                                 Config                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _instance: Config                                                          │
│ + api_key: str                                                              │
│ + api_secret: str                                                           │
│ + base_url: str                                                             │
│ + account_no: str                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ + get_instance(): Config                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              TokenManager                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _access_token: str | None                                                  │
│ - _token_expires_at: datetime | None                                         │
│ - _config: Config                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ + get_token(): str                                                           │
│ + refresh_token(): str                                                       │
│ + is_token_valid(): bool                                                     │
│ - _request_token(): TokenResponse                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              LSApiClient                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _token_manager: TokenManager                                               │
│ - _http_client: httpx.AsyncClient                                            │
│ - _base_url: str                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ + request(method, endpoint, data): Response                                  │
│ + get_quote(symbol): Quote                                                   │
│ + place_order(order): OrderResponse                                          │
│ + modify_order(order_id, data): OrderResponse                                │
│ + cancel_order(order_id): OrderResponse                                      │
│ + get_balance(): Balance                                                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          <<interface>>                                       │
│                          TradingStrategy                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ + name: str                                                                  │
│ + analyze(market_data: MarketData): Signal                                   │
│ + on_tick(tick: Tick): None                                                  │
│ + get_parameters(): dict                                                     │
│ + set_parameters(params: dict): None                                         │
└─────────────────────────────────────────────────────────────────────────────┘
              △                       △                       △
              │                       │                       │
┌─────────────┴─────┐   ┌─────────────┴─────┐   ┌─────────────┴─────┐
│ MovingAverageStrategy │   RSIStrategy    │   │   MACDStrategy    │
├───────────────────────┤   ├──────────────┤   ├───────────────────┤
│ - short_period: int   │   │ - period: int│   │ - fast_period: int│
│ - long_period: int    │   │ - overbought │   │ - slow_period: int│
├───────────────────────┤   ├──────────────┤   ├───────────────────┤
│ + analyze()           │   │ + analyze()  │   │ + analyze()       │
└───────────────────────┘   └──────────────┘   └───────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                             StrategyEngine                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _strategies: dict[str, TradingStrategy]                                    │
│ - _active_strategies: set[str]                                               │
│ - _event_bus: EventBus                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ + register_strategy(strategy): None                                          │
│ + unregister_strategy(name): None                                            │
│ + start_strategy(name): None                                                 │
│ + stop_strategy(name): None                                                  │
│ + process_market_data(data): list[Signal]                                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              OrderManager                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _client: LSApiClient                                                       │
│ - _order_factory: OrderFactory                                               │
│ - _pending_orders: dict[str, Order]                                          │
│ - _event_bus: EventBus                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ + create_order(signal): Order                                                │
│ + submit_order(order): OrderResponse                                         │
│ + modify_order(order_id, changes): OrderResponse                             │
│ + cancel_order(order_id): OrderResponse                                      │
│ + get_order_status(order_id): OrderStatus                                    │
│ + get_order_history(): list[Order]                                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            PositionManager                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _client: LSApiClient                                                       │
│ - _positions: dict[str, Position]                                            │
│ - _event_bus: EventBus                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ + sync_positions(): None                                                     │
│ + get_position(symbol): Position | None                                      │
│ + get_all_positions(): list[Position]                                        │
│ + calculate_pnl(symbol): PnL                                                 │
│ + get_total_exposure(): Decimal                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              RiskManager                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _position_manager: PositionManager                                         │
│ - _max_position_size: Decimal                                                │
│ - _max_loss_limit: Decimal                                                   │
│ - _max_daily_loss: Decimal                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ + check_order_risk(order): RiskCheckResult                                   │
│ + calculate_position_size(signal): int                                       │
│ + should_stop_trading(): bool                                                │
│ + get_risk_metrics(): RiskMetrics                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         <<Observer Pattern>>                                 │
│                              EventBus                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _subscribers: dict[EventType, list[Callable]]                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ + subscribe(event_type, handler): None                                       │
│ + unsubscribe(event_type, handler): None                                     │
│ + publish(event): None                                                       │
│ + publish_async(event): None                                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         <<Factory Pattern>>                                  │
│                            OrderFactory                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ + create_market_order(symbol, side, qty): Order                              │
│ + create_limit_order(symbol, side, qty, price): Order                        │
│ + create_stop_order(symbol, side, qty, stop_price): Order                    │
│ + create_from_signal(signal): Order                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Pydantic 모델 정의

### 4.1 주문 모델

```python
# models/order.py
from enum import Enum
from decimal import Decimal
from datetime import datetime
from pydantic import BaseModel, Field


class OrderSide(str, Enum):
    """주문 방향"""
    BUY = "buy"      # 매수
    SELL = "sell"    # 매도


class OrderType(str, Enum):
    """주문 유형"""
    MARKET = "market"    # 시장가
    LIMIT = "limit"      # 지정가
    STOP = "stop"        # 스톱


class OrderStatus(str, Enum):
    """주문 상태"""
    PENDING = "pending"        # 대기
    SUBMITTED = "submitted"    # 제출됨
    FILLED = "filled"          # 체결
    PARTIAL = "partial"        # 부분 체결
    CANCELLED = "cancelled"    # 취소됨
    REJECTED = "rejected"      # 거부됨


class Order(BaseModel):
    """주문 모델"""
    id: str | None = None
    symbol: str = Field(..., description="종목 코드")
    side: OrderSide = Field(..., description="매수/매도")
    order_type: OrderType = Field(..., description="주문 유형")
    quantity: int = Field(..., gt=0, description="주문 수량")
    price: Decimal | None = Field(None, description="주문 가격")
    stop_price: Decimal | None = Field(None, description="스톱 가격")
    status: OrderStatus = Field(default=OrderStatus.PENDING)
    filled_quantity: int = Field(default=0, description="체결 수량")
    filled_price: Decimal | None = Field(None, description="체결 가격")
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime | None = None

    class Config:
        use_enum_values = True


class OrderRequest(BaseModel):
    """주문 요청 모델 (API 입력)"""
    symbol: str
    side: OrderSide
    order_type: OrderType
    quantity: int = Field(..., gt=0)
    price: Decimal | None = None
    stop_price: Decimal | None = None


class OrderResponse(BaseModel):
    """주문 응답 모델 (API 출력)"""
    success: bool
    order_id: str | None = None
    message: str | None = None
    order: Order | None = None
```

### 4.2 포지션 모델

```python
# models/position.py
from decimal import Decimal
from datetime import datetime
from pydantic import BaseModel, Field, computed_field


class Position(BaseModel):
    """포지션 모델"""
    symbol: str = Field(..., description="종목 코드")
    symbol_name: str = Field(..., description="종목명")
    quantity: int = Field(..., description="보유 수량")
    avg_price: Decimal = Field(..., description="평균 매입가")
    current_price: Decimal = Field(..., description="현재가")

    @computed_field
    @property
    def market_value(self) -> Decimal:
        """평가 금액"""
        return self.current_price * self.quantity

    @computed_field
    @property
    def unrealized_pnl(self) -> Decimal:
        """미실현 손익"""
        return (self.current_price - self.avg_price) * self.quantity

    @computed_field
    @property
    def unrealized_pnl_pct(self) -> Decimal:
        """미실현 손익률 (%)"""
        if self.avg_price == 0:
            return Decimal(0)
        return ((self.current_price - self.avg_price) / self.avg_price) * 100


class PositionSummary(BaseModel):
    """포지션 요약"""
    total_positions: int
    total_market_value: Decimal
    total_unrealized_pnl: Decimal
    positions: list[Position]
```

### 4.3 전략 모델

```python
# models/strategy.py
from enum import Enum
from pydantic import BaseModel, Field


class SignalType(str, Enum):
    """신호 유형"""
    BUY = "buy"
    SELL = "sell"
    HOLD = "hold"


class Signal(BaseModel):
    """매매 신호"""
    symbol: str
    signal_type: SignalType
    strength: float = Field(..., ge=0, le=1, description="신호 강도 (0~1)")
    price: float
    strategy_name: str
    reason: str | None = None
    timestamp: float


class StrategyConfig(BaseModel):
    """전략 설정"""
    name: str
    enabled: bool = True
    parameters: dict = Field(default_factory=dict)


class StrategyStatus(BaseModel):
    """전략 상태"""
    name: str
    is_running: bool
    parameters: dict
    last_signal: Signal | None = None
    signals_generated: int = 0
    orders_created: int = 0
```

---

## 5. 핵심 클래스 구현

### 5.1 Config (Singleton Pattern)

```python
# app/config.py
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """애플리케이션 설정 (Singleton via lru_cache)"""

    # LS증권 API 설정
    ls_api_key: str
    ls_api_secret: str
    ls_base_url: str = "https://openapi.ebestsec.co.kr:8080"
    ls_account_no: str

    # 리스크 설정
    max_position_size: int = 10_000_000  # 최대 포지션 금액
    max_loss_limit: float = 0.02         # 최대 손실 한도 (2%)
    max_daily_loss: int = 500_000        # 일일 최대 손실

    # 앱 설정
    debug: bool = False
    log_level: str = "INFO"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    """설정 인스턴스 반환 (Singleton)"""
    return Settings()
```

### 5.2 TokenManager & LSApiClient

```python
# core/client/auth.py
import httpx
from datetime import datetime, timedelta
from pydantic import BaseModel


class TokenResponse(BaseModel):
    """토큰 응답"""
    access_token: str
    token_type: str
    expires_in: int
    scope: str


class TokenManager:
    """OAuth 토큰 관리자"""

    def __init__(self, api_key: str, api_secret: str, base_url: str):
        self._api_key = api_key
        self._api_secret = api_secret
        self._base_url = base_url
        self._access_token: str | None = None
        self._token_expires_at: datetime | None = None

    async def get_token(self) -> str:
        """유효한 토큰 반환 (필요시 갱신)"""
        if not self._is_token_valid():
            await self._refresh_token()
        return self._access_token

    def _is_token_valid(self) -> bool:
        """토큰 유효성 검사"""
        if not self._access_token or not self._token_expires_at:
            return False
        # 만료 5분 전에 갱신
        return datetime.now() < (self._token_expires_at - timedelta(minutes=5))

    async def _refresh_token(self) -> None:
        """토큰 갱신"""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self._base_url}/oauth2/token",
                headers={"content-type": "application/x-www-form-urlencoded"},
                data={
                    "grant_type": "client_credentials",
                    "appkey": self._api_key,
                    "appsecretkey": self._api_secret,
                    "scope": "oob",
                }
            )
            response.raise_for_status()
            token_data = TokenResponse(**response.json())

            self._access_token = token_data.access_token
            self._token_expires_at = datetime.now() + timedelta(
                seconds=token_data.expires_in
            )
```

```python
# core/client/ls_client.py
import httpx
from typing import Any
from app.config import Settings
from core.client.auth import TokenManager
from models.order import Order, OrderResponse
from utils.logger import get_logger

logger = get_logger(__name__)


class LSApiClient:
    """LS증권 API 클라이언트"""

    # TR 코드 상수
    TR_ORDER_NEW = "CSPAT00600"      # 신규 주문
    TR_ORDER_MODIFY = "CSPAT00700"   # 정정 주문
    TR_ORDER_CANCEL = "CSPAT00800"   # 취소 주문

    def __init__(self, settings: Settings):
        self._settings = settings
        self._token_manager = TokenManager(
            api_key=settings.ls_api_key,
            api_secret=settings.ls_api_secret,
            base_url=settings.ls_base_url,
        )
        self._base_url = settings.ls_base_url

    async def _get_headers(self) -> dict[str, str]:
        """API 요청 헤더 생성"""
        token = await self._token_manager.get_token()
        return {
            "content-type": "application/json; charset=utf-8",
            "authorization": f"Bearer {token}",
            "tr_cd": "",  # TR 코드는 요청마다 설정
            "tr_cont": "N",
            "tr_cont_key": "",
            "mac_address": "",
        }

    async def request(
        self,
        method: str,
        endpoint: str,
        tr_code: str,
        data: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """API 요청 실행"""
        headers = await self._get_headers()
        headers["tr_cd"] = tr_code

        url = f"{self._base_url}{endpoint}"

        async with httpx.AsyncClient() as client:
            response = await client.request(
                method=method,
                url=url,
                headers=headers,
                json=data,
            )

            logger.info(f"API 요청: {method} {endpoint} TR={tr_code}")

            if response.status_code != 200:
                logger.error(f"API 오류: {response.status_code} - {response.text}")
                response.raise_for_status()

            return response.json()

    async def place_order(self, order: Order) -> OrderResponse:
        """신규 주문"""
        # 매수/매도 구분 (1: 매도, 2: 매수)
        buy_sell_tp = "2" if order.side.value == "buy" else "1"

        # 주문 유형 (00: 지정가, 03: 시장가)
        ord_prc_ptn_code = "03" if order.order_type.value == "market" else "00"

        request_data = {
            f"{self.TR_ORDER_NEW}InBlock1": {
                "IsuNo": order.symbol,           # 종목 코드
                "OrdQty": order.quantity,        # 주문 수량
                "OrdPrc": float(order.price or 0),  # 주문 가격
                "BnsTpCode": buy_sell_tp,        # 매매 구분
                "OrdprcPtnCode": ord_prc_ptn_code,  # 호가 유형
                "MgntrnCode": "000",             # 신용 거래 코드
                "LoanDt": "",                    # 대출일
                "OrdCndiTpCode": "0",            # 주문 조건
            }
        }

        try:
            response = await self.request(
                method="POST",
                endpoint="/stock/order",
                tr_code=self.TR_ORDER_NEW,
                data=request_data,
            )

            # 응답 파싱
            out_block = response.get(f"{self.TR_ORDER_NEW}OutBlock1", {})
            out_block2 = response.get(f"{self.TR_ORDER_NEW}OutBlock2", {})

            return OrderResponse(
                success=True,
                order_id=out_block2.get("OrdNo"),
                message="주문이 정상 처리되었습니다.",
                order=order,
            )
        except httpx.HTTPStatusError as e:
            logger.error(f"주문 실패: {e}")
            return OrderResponse(
                success=False,
                message=f"주문 실패: {str(e)}",
            )

    async def modify_order(
        self,
        original_order_no: str,
        symbol: str,
        quantity: int,
        price: float,
    ) -> OrderResponse:
        """주문 정정"""
        request_data = {
            f"{self.TR_ORDER_MODIFY}InBlock1": {
                "OrgOrdNo": original_order_no,   # 원주문 번호
                "IsuNo": symbol,                 # 종목 코드
                "OrdQty": quantity,              # 정정 수량
                "OrdPrc": price,                 # 정정 가격
                "OrdprcPtnCode": "00",           # 호가 유형 (지정가)
                "OrdCndiTpCode": "0",            # 주문 조건
            }
        }

        response = await self.request(
            method="POST",
            endpoint="/stock/order",
            tr_code=self.TR_ORDER_MODIFY,
            data=request_data,
        )

        out_block2 = response.get(f"{self.TR_ORDER_MODIFY}OutBlock2", {})

        return OrderResponse(
            success=True,
            order_id=out_block2.get("OrdNo"),
            message="주문이 정정되었습니다.",
        )

    async def cancel_order(
        self,
        original_order_no: str,
        symbol: str,
        quantity: int,
    ) -> OrderResponse:
        """주문 취소"""
        request_data = {
            f"{self.TR_ORDER_CANCEL}InBlock1": {
                "OrgOrdNo": original_order_no,   # 원주문 번호
                "IsuNo": symbol,                 # 종목 코드
                "OrdQty": quantity,              # 취소 수량
            }
        }

        response = await self.request(
            method="POST",
            endpoint="/stock/order",
            tr_code=self.TR_ORDER_CANCEL,
            data=request_data,
        )

        out_block2 = response.get(f"{self.TR_ORDER_CANCEL}OutBlock2", {})

        return OrderResponse(
            success=True,
            order_id=out_block2.get("OrdNo"),
            message="주문이 취소되었습니다.",
        )
```

### 5.3 Strategy Pattern 구현

```python
# core/strategy/base.py
from abc import ABC, abstractmethod
from typing import Any
from models.strategy import Signal, SignalType
from models.market import MarketData


class TradingStrategy(ABC):
    """매매 전략 기본 인터페이스 (Strategy Pattern)"""

    def __init__(self, name: str, parameters: dict[str, Any] | None = None):
        self._name = name
        self._parameters = parameters or {}
        self._is_running = False

    @property
    def name(self) -> str:
        return self._name

    @property
    def is_running(self) -> bool:
        return self._is_running

    def start(self) -> None:
        """전략 시작"""
        self._is_running = True

    def stop(self) -> None:
        """전략 중지"""
        self._is_running = False

    def get_parameters(self) -> dict[str, Any]:
        """파라미터 조회"""
        return self._parameters.copy()

    def set_parameters(self, parameters: dict[str, Any]) -> None:
        """파라미터 설정"""
        self._parameters.update(parameters)

    @abstractmethod
    async def analyze(self, market_data: MarketData) -> Signal:
        """시장 데이터 분석 및 신호 생성"""
        pass

    @abstractmethod
    def validate_parameters(self) -> bool:
        """파라미터 유효성 검증"""
        pass
```

```python
# core/strategy/strategies/moving_average.py
import time
from typing import Any
from core.strategy.base import TradingStrategy
from models.strategy import Signal, SignalType
from models.market import MarketData


class MovingAverageStrategy(TradingStrategy):
    """이동평균 교차 전략"""

    def __init__(
        self,
        short_period: int = 5,
        long_period: int = 20,
    ):
        super().__init__(
            name="MovingAverage",
            parameters={
                "short_period": short_period,
                "long_period": long_period,
            }
        )
        self._price_history: list[float] = []

    def validate_parameters(self) -> bool:
        """파라미터 검증"""
        short = self._parameters.get("short_period", 0)
        long = self._parameters.get("long_period", 0)
        return 0 < short < long

    async def analyze(self, market_data: MarketData) -> Signal:
        """이동평균 교차 분석"""
        # 가격 히스토리 업데이트
        self._price_history.append(market_data.close_price)

        short_period = self._parameters["short_period"]
        long_period = self._parameters["long_period"]

        # 데이터 부족시 HOLD
        if len(self._price_history) < long_period:
            return Signal(
                symbol=market_data.symbol,
                signal_type=SignalType.HOLD,
                strength=0.0,
                price=market_data.close_price,
                strategy_name=self.name,
                reason="데이터 부족",
                timestamp=time.time(),
            )

        # 이동평균 계산
        short_ma = sum(self._price_history[-short_period:]) / short_period
        long_ma = sum(self._price_history[-long_period:]) / long_period

        # 이전 이동평균 계산 (교차 확인용)
        prev_short_ma = sum(self._price_history[-short_period-1:-1]) / short_period
        prev_long_ma = sum(self._price_history[-long_period-1:-1]) / long_period

        # 골든크로스: 단기 MA가 장기 MA를 상향 돌파
        if prev_short_ma <= prev_long_ma and short_ma > long_ma:
            return Signal(
                symbol=market_data.symbol,
                signal_type=SignalType.BUY,
                strength=min(1.0, (short_ma - long_ma) / long_ma * 100),
                price=market_data.close_price,
                strategy_name=self.name,
                reason=f"골든크로스 (단기MA: {short_ma:.2f}, 장기MA: {long_ma:.2f})",
                timestamp=time.time(),
            )

        # 데드크로스: 단기 MA가 장기 MA를 하향 돌파
        if prev_short_ma >= prev_long_ma and short_ma < long_ma:
            return Signal(
                symbol=market_data.symbol,
                signal_type=SignalType.SELL,
                strength=min(1.0, (long_ma - short_ma) / long_ma * 100),
                price=market_data.close_price,
                strategy_name=self.name,
                reason=f"데드크로스 (단기MA: {short_ma:.2f}, 장기MA: {long_ma:.2f})",
                timestamp=time.time(),
            )

        return Signal(
            symbol=market_data.symbol,
            signal_type=SignalType.HOLD,
            strength=0.0,
            price=market_data.close_price,
            strategy_name=self.name,
            reason="교차 신호 없음",
            timestamp=time.time(),
        )
```

### 5.4 Observer Pattern (EventBus)

```python
# core/events/event_bus.py
import asyncio
from typing import Callable, Any
from collections import defaultdict
from utils.logger import get_logger

logger = get_logger(__name__)


class EventBus:
    """이벤트 버스 (Observer Pattern)"""

    def __init__(self):
        self._subscribers: dict[str, list[Callable]] = defaultdict(list)
        self._async_subscribers: dict[str, list[Callable]] = defaultdict(list)

    def subscribe(self, event_type: str, handler: Callable) -> None:
        """동기 이벤트 구독"""
        self._subscribers[event_type].append(handler)
        logger.debug(f"이벤트 구독: {event_type}")

    def subscribe_async(self, event_type: str, handler: Callable) -> None:
        """비동기 이벤트 구독"""
        self._async_subscribers[event_type].append(handler)
        logger.debug(f"비동기 이벤트 구독: {event_type}")

    def unsubscribe(self, event_type: str, handler: Callable) -> None:
        """이벤트 구독 해제"""
        if handler in self._subscribers[event_type]:
            self._subscribers[event_type].remove(handler)
        if handler in self._async_subscribers[event_type]:
            self._async_subscribers[event_type].remove(handler)

    def publish(self, event_type: str, data: Any = None) -> None:
        """동기 이벤트 발행"""
        for handler in self._subscribers[event_type]:
            try:
                handler(data)
            except Exception as e:
                logger.error(f"이벤트 핸들러 오류 ({event_type}): {e}")

    async def publish_async(self, event_type: str, data: Any = None) -> None:
        """비동기 이벤트 발행"""
        # 동기 핸들러 실행
        self.publish(event_type, data)

        # 비동기 핸들러 실행
        tasks = [
            handler(data)
            for handler in self._async_subscribers[event_type]
        ]

        if tasks:
            results = await asyncio.gather(*tasks, return_exceptions=True)
            for result in results:
                if isinstance(result, Exception):
                    logger.error(f"비동기 이벤트 핸들러 오류 ({event_type}): {result}")
```

### 5.5 Factory Pattern (OrderFactory)

```python
# factories/order_factory.py
from decimal import Decimal
from models.order import Order, OrderSide, OrderType
from models.strategy import Signal, SignalType


class OrderFactory:
    """주문 생성 팩토리 (Factory Pattern)"""

    @staticmethod
    def create_market_order(
        symbol: str,
        side: OrderSide,
        quantity: int,
    ) -> Order:
        """시장가 주문 생성"""
        return Order(
            symbol=symbol,
            side=side,
            order_type=OrderType.MARKET,
            quantity=quantity,
        )

    @staticmethod
    def create_limit_order(
        symbol: str,
        side: OrderSide,
        quantity: int,
        price: Decimal,
    ) -> Order:
        """지정가 주문 생성"""
        return Order(
            symbol=symbol,
            side=side,
            order_type=OrderType.LIMIT,
            quantity=quantity,
            price=price,
        )

    @staticmethod
    def create_stop_order(
        symbol: str,
        side: OrderSide,
        quantity: int,
        stop_price: Decimal,
    ) -> Order:
        """스톱 주문 생성"""
        return Order(
            symbol=symbol,
            side=side,
            order_type=OrderType.STOP,
            quantity=quantity,
            stop_price=stop_price,
        )

    @classmethod
    def create_from_signal(
        cls,
        signal: Signal,
        quantity: int,
        order_type: OrderType = OrderType.MARKET,
        price: Decimal | None = None,
    ) -> Order:
        """신호에서 주문 생성"""
        side = OrderSide.BUY if signal.signal_type == SignalType.BUY else OrderSide.SELL

        if order_type == OrderType.MARKET:
            return cls.create_market_order(signal.symbol, side, quantity)
        elif order_type == OrderType.LIMIT:
            if price is None:
                price = Decimal(str(signal.price))
            return cls.create_limit_order(signal.symbol, side, quantity, price)
        else:
            raise ValueError(f"지원하지 않는 주문 유형: {order_type}")
```

### 5.6 RiskManager

```python
# core/trading/risk_manager.py
from decimal import Decimal
from pydantic import BaseModel
from core.trading.position_manager import PositionManager
from models.order import Order, OrderSide
from models.strategy import Signal
from app.config import Settings
from utils.logger import get_logger

logger = get_logger(__name__)


class RiskCheckResult(BaseModel):
    """리스크 체크 결과"""
    approved: bool
    reason: str | None = None
    adjusted_quantity: int | None = None


class RiskMetrics(BaseModel):
    """리스크 지표"""
    total_exposure: Decimal
    max_position_size: Decimal
    daily_pnl: Decimal
    max_daily_loss: Decimal
    risk_level: str  # "low", "medium", "high"


class RiskManager:
    """리스크 관리자"""

    def __init__(
        self,
        position_manager: PositionManager,
        settings: Settings,
    ):
        self._position_manager = position_manager
        self._max_position_size = Decimal(settings.max_position_size)
        self._max_loss_limit = Decimal(str(settings.max_loss_limit))
        self._max_daily_loss = Decimal(settings.max_daily_loss)
        self._daily_pnl = Decimal(0)

    def check_order_risk(self, order: Order, current_price: Decimal) -> RiskCheckResult:
        """주문 리스크 체크"""
        # 1. 일일 손실 한도 체크
        if self._daily_pnl <= -self._max_daily_loss:
            return RiskCheckResult(
                approved=False,
                reason="일일 손실 한도 초과",
            )

        # 2. 포지션 크기 체크
        order_value = current_price * order.quantity
        current_exposure = self._position_manager.get_total_exposure()

        if order.side == OrderSide.BUY:
            new_exposure = current_exposure + order_value
        else:
            new_exposure = current_exposure - order_value

        if new_exposure > self._max_position_size:
            # 조정된 수량 계산
            available = self._max_position_size - current_exposure
            adjusted_qty = int(available / current_price)

            if adjusted_qty <= 0:
                return RiskCheckResult(
                    approved=False,
                    reason="최대 포지션 크기 초과",
                )

            return RiskCheckResult(
                approved=True,
                reason="수량 조정됨",
                adjusted_quantity=adjusted_qty,
            )

        return RiskCheckResult(approved=True)

    def should_stop_trading(self) -> bool:
        """거래 중단 여부 판단"""
        return self._daily_pnl <= -self._max_daily_loss

    def get_risk_metrics(self) -> RiskMetrics:
        """리스크 지표 조회"""
        total_exposure = self._position_manager.get_total_exposure()

        # 리스크 레벨 계산
        exposure_ratio = total_exposure / self._max_position_size
        if exposure_ratio < Decimal("0.5"):
            risk_level = "low"
        elif exposure_ratio < Decimal("0.8"):
            risk_level = "medium"
        else:
            risk_level = "high"

        return RiskMetrics(
            total_exposure=total_exposure,
            max_position_size=self._max_position_size,
            daily_pnl=self._daily_pnl,
            max_daily_loss=self._max_daily_loss,
            risk_level=risk_level,
        )
```

---

## 6. FastAPI REST API 구현

### 6.1 메인 앱

```python
# app/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from api.routes import orders, positions, strategies, account, market, health


@asynccontextmanager
async def lifespan(app: FastAPI):
    """앱 생명주기 관리"""
    settings = get_settings()
    print(f"Trading Bot 시작 (Debug: {settings.debug})")
    yield
    print("Trading Bot 종료")


app = FastAPI(
    title="LS증권 자동매매 봇 API",
    description="LS증권 Open API를 활용한 자동매매 봇 시스템",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS 설정 (Next.js 연동)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(health.router, prefix="/api/v1", tags=["Health"])
app.include_router(orders.router, prefix="/api/v1/orders", tags=["Orders"])
app.include_router(positions.router, prefix="/api/v1/positions", tags=["Positions"])
app.include_router(strategies.router, prefix="/api/v1/strategies", tags=["Strategies"])
app.include_router(account.router, prefix="/api/v1/account", tags=["Account"])
app.include_router(market.router, prefix="/api/v1/market", tags=["Market"])
```

### 6.2 주문 API

```python
# api/routes/orders.py
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated

from app.dependencies import get_order_manager
from core.trading.order_manager import OrderManager
from models.order import Order, OrderRequest, OrderResponse, OrderSide, OrderType

router = APIRouter()


@router.post("", response_model=OrderResponse)
async def create_order(
    request: OrderRequest,
    order_manager: Annotated[OrderManager, Depends(get_order_manager)],
):
    """신규 주문 생성"""
    order = Order(
        symbol=request.symbol,
        side=request.side,
        order_type=request.order_type,
        quantity=request.quantity,
        price=request.price,
        stop_price=request.stop_price,
    )

    return await order_manager.submit_order(order)


@router.get("", response_model=list[Order])
async def get_orders(
    order_manager: Annotated[OrderManager, Depends(get_order_manager)],
):
    """주문 목록 조회"""
    return order_manager.get_pending_orders()


@router.delete("/{order_id}", response_model=OrderResponse)
async def cancel_order(
    order_id: str,
    order_manager: Annotated[OrderManager, Depends(get_order_manager)],
):
    """주문 취소"""
    return await order_manager.cancel_order(order_id)
```

---

## 7. Next.js 연동

```typescript
// lib/api/trading-api.ts
import ky from 'ky';

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  credentials: 'include',
});

// 주문 API
export const ordersApi = {
  getOrders: () => api.get('orders').json<Order[]>(),
  createOrder: (data: OrderRequest) =>
    api.post('orders', { json: data }).json<OrderResponse>(),
  cancelOrder: (orderId: string) =>
    api.delete(`orders/${orderId}`).json<OrderResponse>(),
};

// 전략 API
export const strategiesApi = {
  getStrategies: () => api.get('strategies').json<StrategyStatus[]>(),
  startStrategy: (name: string) =>
    api.post(`strategies/${name}/start`).json(),
  stopStrategy: (name: string) =>
    api.post(`strategies/${name}/stop`).json(),
};

// WebSocket 연결
export function connectRealtimeSocket(onMessage: (data: any) => void) {
  const ws = new WebSocket(
    process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws/realtime'
  );

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  return ws;
}
```

---

## 8. 사용 예제 (주식 주문)

```python
# 사용 예제
import asyncio
from decimal import Decimal
from app.config import get_settings
from core.client.ls_client import LSApiClient
from models.order import Order, OrderSide, OrderType


async def main():
    # 설정 로드
    settings = get_settings()

    # API 클라이언트 생성
    client = LSApiClient(settings)

    # 시장가 매수 주문
    order = Order(
        symbol="005930",  # 삼성전자
        side=OrderSide.BUY,
        order_type=OrderType.MARKET,
        quantity=10,
    )

    response = await client.place_order(order)

    if response.success:
        print(f"주문 성공! 주문번호: {response.order_id}")
    else:
        print(f"주문 실패: {response.message}")

    # 지정가 매도 주문
    limit_order = Order(
        symbol="005930",
        side=OrderSide.SELL,
        order_type=OrderType.LIMIT,
        quantity=10,
        price=Decimal("75000"),
    )

    response = await client.place_order(limit_order)
    print(f"지정가 주문 결과: {response}")


if __name__ == "__main__":
    asyncio.run(main())
```

---

## 9. 환경 설정

```
# .env.example
# LS증권 API 설정
LS_API_KEY=your_api_key
LS_API_SECRET=your_api_secret
LS_BASE_URL=https://openapi.ebestsec.co.kr:8080
LS_ACCOUNT_NO=your_account_number

# 리스크 설정
MAX_POSITION_SIZE=10000000
MAX_LOSS_LIMIT=0.02
MAX_DAILY_LOSS=500000

# 앱 설정
DEBUG=false
LOG_LEVEL=INFO
```

---

## 10. requirements.txt

```
# Web Framework
fastapi>=0.109.0
uvicorn[standard]>=0.27.0

# HTTP Client
httpx>=0.26.0

# Data Validation
pydantic>=2.5.0
pydantic-settings>=2.1.0

# Testing
pytest>=7.4.0
pytest-asyncio>=0.23.0

# Development
python-dotenv>=1.0.0
```

---

## 11. LS증권 API 계정 신청 방법

1. [LS증권 OpenAPI 포털](https://openapi.ls-sec.co.kr) 접속
2. 회원가입 및 로그인
3. "API 사용 신청" 메뉴에서 신청
4. App Key / App Secret 발급
5. 모의투자 계좌로 테스트 후 실전 적용

---

## 참고 자료

- [LS증권 Open API 포털](https://openapi.ls-sec.co.kr)
- [LS증권 OpenAPI 샘플 (GitHub)](https://github.com/teranum/ls-openapi-samples)
- [WikiDocs - API 접속 토큰 발급](https://wikidocs.net/230259)
