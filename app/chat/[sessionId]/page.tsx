import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ChatInterface } from '@/components/ChatInterface';
import { Message } from '@prisma/client';

interface PageProps {
  params: { sessionId: string };
}

export default async function ChatPage({ params }: PageProps) {
  const session = await prisma.chatSession.findUnique({
    where: { id: params.sessionId },
    include: {
      participant: {
        include: {
          program: {
            select: {
              name: true,
            },
          },
        },
      },
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!session) {
    notFound();
  }

  // Check if session is expired or completed
  if (session.status === 'EXPIRED') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⏰</span>
          </div>
          <h1 className="text-xl font-semibold mb-2">Session Expired</h1>
          <p className="text-muted-foreground">
            This interview session has expired. Please contact your L&D team for a new link.
          </p>
        </div>
      </div>
    );
  }

  if (session.status === 'COMPLETED') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-xl font-semibold mb-2">Interview Complete</h1>
          <p className="text-muted-foreground">
            Thanks for completing your coaching session, {session.participant.name}!
            We&apos;ll be in touch with follow-up support.
          </p>
        </div>
      </div>
    );
  }

  const messages = session.messages.map((m: Message) => ({
    id: m.id,
    role: m.role as 'USER' | 'ASSISTANT',
    content: m.content,
    createdAt: m.createdAt.toISOString(),
  }));

  return (
    <ChatInterface
      sessionId={session.id}
      initialMessages={messages}
      programName={session.participant.program.name}
      participantName={session.participant.name}
    />
  );
}
