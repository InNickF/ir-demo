import Lines from "@/commons/components/decoration/Lines";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { NextPageWithLayout } from "@/commons/typings";
import { ChatForm } from "@/insight/components/data-entry/ChatForm";
import { InsightHead } from "@/insight/components/general/InsightHead";
import { useAddNewChatAndRedirect } from "@/insight/hooks/useAddNewChatAndRedirect";
import { GeneralLayout } from "@/insight/layouts/General";
import { InsightPermissionsLayout } from "@/modules/insight/layouts/InsightPermissionsLayout";
import { Portal } from "in-ui-react";
import { ReactElement } from "react";
import { PageHeading } from "./components/PageHeading";
import { SamplePrompts } from "./components/SamplePrompts";
import "./styles.css";

const NewChatPage: NextPageWithLayout = () => {
  const addNewChat = useAddNewChatAndRedirect();

  return (
    <>
      <PageContainer className="insight-home-container generic-entrance-animation">
        <PageHeading />
        <SamplePrompts onPromptClick={addNewChat} />
      </PageContainer>
      <ChatForm
        placeholder="Type your questions and interact with I.R.'s data."
        onMessage={(formData) => {
          addNewChat(formData.content);
        }}
      />
      <Portal>
        <Lines />
      </Portal>
    </>
  );
};

NewChatPage.getLayout = (page: ReactElement) => {
  return (
    <InsightPermissionsLayout>
      <InsightHead title="New Conversation" />
      <GeneralLayout>{page}</GeneralLayout>
    </InsightPermissionsLayout>
  );
};

export default NewChatPage;
