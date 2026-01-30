#!/usr/bin/env python3
"""
Claude Code 프롬프트 로거
사용자가 입력한 모든 프롬프트를 로그 파일에 기록합니다.
"""

import json
import sys
import os
from datetime import datetime, UTC
from pathlib import Path


def sanitize_string(s: str) -> str:
    """surrogate 문자를 제거하여 안전한 UTF-8 문자열로 변환"""
    if not isinstance(s, str):
        return s
    # surrogate 문자를 replacement 문자로 교체
    return s.encode("utf-8", errors="replace").decode("utf-8")


def log_prompt():
    """stdin에서 hook 입력을 받아 로그 파일에 기록"""
    try:
        # stdin에서 JSON 입력 읽기
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError as e:
        print(f"Error: JSON 파싱 실패: {e}", file=sys.stderr)
        sys.exit(1)

    # 입력 데이터에서 필요한 정보 추출
    prompt = input_data.get("prompt", "")
    session_id = input_data.get("session_id", "unknown")
    cwd = input_data.get("cwd", "")

    # 프로젝트 디렉토리 (환경변수에서 가져오기)
    project_dir = os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd())

    # 로그 파일 경로
    log_dir = os.path.join(project_dir, ".claude", "logs")
    log_file = os.path.join(log_dir, "prompts.log")

    # 로그 디렉토리 생성
    Path(log_dir).mkdir(parents=True, exist_ok=True)

    # 로그 항목 생성 (surrogate 문자 제거)
    log_entry = {
        "timestamp": datetime.now(UTC).isoformat().replace("+00:00", "Z"),
        "session_id": sanitize_string(session_id),
        "prompt": sanitize_string(prompt),
        "cwd": sanitize_string(cwd),
    }

    # 로그 파일에 기록 (JSONL 형식)
    try:
        with open(log_file, "a", encoding="utf-8") as f:
            f.write(json.dumps(log_entry, ensure_ascii=False) + "\n")
    except Exception as e:
        print(f"Error: 로그 파일 쓰기 실패: {e}", file=sys.stderr)
        sys.exit(1)

    # 성공 (프롬프트 진행 허용)
    sys.exit(0)


if __name__ == "__main__":
    log_prompt()
