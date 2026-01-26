import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

// 이용약관 페이지
export default function TermsPage() {
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
        <h1 className="text-4xl font-bold tracking-tight">이용약관</h1>
        <p className="mt-4 text-muted-foreground">
          최종 수정일: 2024년 1월 1일
        </p>

        {/* 본문 내용 */}
        <div className="mt-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">제1조 (목적)</h2>
            <p className="mt-3">
              이 약관은 회사가 제공하는 서비스의 이용 조건 및 절차, 회사와 회원 간의
              권리, 의무, 책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">제2조 (정의)</h2>
            <p className="mt-3">
              이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>&quot;서비스&quot;란 회사가 제공하는 모든 온라인 서비스를 의미합니다.</li>
              <li>&quot;회원&quot;이란 서비스에 가입하여 이용계약을 체결한 자를 말합니다.</li>
              <li>&quot;콘텐츠&quot;란 서비스 내에서 제공되는 모든 정보를 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">제3조 (약관의 효력 및 변경)</h2>
            <p className="mt-3">
              이 약관은 서비스를 이용하고자 하는 모든 회원에게 적용됩니다.
              회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">제4조 (서비스의 제공)</h2>
            <p className="mt-3">
              회사는 다음과 같은 서비스를 제공합니다.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>웹 기반 애플리케이션 서비스</li>
              <li>데이터 저장 및 관리 서비스</li>
              <li>기타 회사가 정하는 서비스</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">제5조 (회원의 의무)</h2>
            <p className="mt-3">
              회원은 다음 행위를 해서는 안 됩니다.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>타인의 정보 도용</li>
              <li>서비스의 정상적인 운영을 방해하는 행위</li>
              <li>회사의 지적재산권을 침해하는 행위</li>
              <li>관련 법령에 위반되는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">제6조 (서비스 이용의 제한)</h2>
            <p className="mt-3">
              회사는 회원이 이 약관의 의무를 위반하거나 서비스의 정상적인 운영을
              방해한 경우, 서비스 이용을 제한하거나 회원 자격을 정지시킬 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">제7조 (면책 조항)</h2>
            <p className="mt-3">
              회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적인
              사유로 인하여 서비스를 제공할 수 없는 경우에는 책임이 면제됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">제8조 (분쟁 해결)</h2>
            <p className="mt-3">
              이 약관과 관련하여 회사와 회원 간에 분쟁이 발생한 경우, 쌍방 간의
              합의에 의해 해결함을 원칙으로 합니다. 합의가 이루어지지 않을 경우
              관할 법원에 소를 제기할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">부칙</h2>
            <p className="mt-3">
              이 약관은 2024년 1월 1일부터 시행됩니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
