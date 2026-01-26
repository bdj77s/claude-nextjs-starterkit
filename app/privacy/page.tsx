import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

// 개인정보처리방침 페이지
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        {/* 홈으로 돌아가기 버튼 */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            홈으로
          </Link>
        </Button>

        {/* 페이지 헤더 */}
        <h1 className="text-4xl font-bold tracking-tight">개인정보처리방침</h1>
        <p className="mt-4 text-muted-foreground">
          최종 수정일: 2024년 1월 1일
        </p>

        {/* 본문 내용 */}
        <div className="mt-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. 개인정보의 수집 및 이용 목적</h2>
            <p className="mt-3">
              회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는
              다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는
              별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>회원 가입 및 관리</li>
              <li>서비스 제공 및 운영</li>
              <li>마케팅 및 광고에의 활용</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. 수집하는 개인정보의 항목</h2>
            <p className="mt-3">
              회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>필수항목: 이메일 주소, 비밀번호, 이름</li>
              <li>선택항목: 프로필 사진, 전화번호</li>
              <li>자동수집항목: IP 주소, 쿠키, 접속 로그</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="mt-3">
              회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를
              수집 시에 동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>회원 정보: 회원 탈퇴 시까지</li>
              <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
              <li>대금 결제 및 재화 등의 공급에 관한 기록: 5년</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. 개인정보의 제3자 제공</h2>
            <p className="mt-3">
              회사는 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며,
              정보주체의 동의, 법률의 특별한 규정 등의 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. 정보주체의 권리·의무</h2>
            <p className="mt-3">
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를
              행사할 수 있습니다.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. 문의처</h2>
            <p className="mt-3">
              개인정보 보호 관련 문의는 아래로 연락해 주시기 바랍니다.
            </p>
            <p className="mt-3">
              이메일: privacy@example.com<br />
              전화: 02-1234-5678
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
