import { HelpCircle, Book, MessageCircle, Mail, ExternalLink } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// FAQ 데이터
const faqItems = [
  {
    question: "계정을 어떻게 만들 수 있나요?",
    answer: "홈페이지에서 '시작하기' 버튼을 클릭하고 이메일 주소와 비밀번호를 입력하면 간단하게 계정을 만들 수 있습니다.",
  },
  {
    question: "비밀번호를 잊어버렸어요.",
    answer: "로그인 페이지에서 '비밀번호 찾기'를 클릭하고 등록된 이메일 주소를 입력하면 비밀번호 재설정 링크를 받을 수 있습니다.",
  },
  {
    question: "요금제는 어떻게 되나요?",
    answer: "무료 플랜과 프로 플랜을 제공합니다. 프로 플랜은 월 ₩9,900으로 모든 프리미엄 기능을 이용할 수 있습니다.",
  },
  {
    question: "데이터는 어떻게 보호되나요?",
    answer: "모든 데이터는 암호화되어 저장되며, 업계 표준 보안 프로토콜을 따릅니다. 자세한 내용은 개인정보처리방침을 참고해 주세요.",
  },
]

// 지원 옵션 데이터
const supportOptions = [
  {
    title: "문서",
    description: "상세한 가이드와 튜토리얼",
    icon: Book,
    action: "문서 보기",
  },
  {
    title: "커뮤니티",
    description: "다른 사용자와 소통",
    icon: MessageCircle,
    action: "커뮤니티 방문",
  },
  {
    title: "이메일 지원",
    description: "support@example.com",
    icon: Mail,
    action: "이메일 보내기",
  },
]

// 도움말 페이지
export default function HelpPage() {
  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center gap-2">
        <HelpCircle className="size-8 text-muted-foreground" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">도움말</h1>
          <p className="text-muted-foreground">
            자주 묻는 질문과 지원 옵션을 확인하세요.
          </p>
        </div>
      </div>

      {/* 지원 옵션 */}
      <div className="grid gap-4 sm:grid-cols-3">
        {supportOptions.map((option) => (
          <Card key={option.title}>
            <CardHeader>
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <option.icon className="size-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                {option.action}
                <ExternalLink className="ml-2 size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>자주 묻는 질문</CardTitle>
          <CardDescription>
            가장 많이 문의하시는 질문들을 모았습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
