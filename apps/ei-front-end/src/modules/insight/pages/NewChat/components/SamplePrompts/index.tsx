import { SamplePrompt } from "@/modules/insight/components/data-entry/SamplePrompt";
import { samplePrompts } from "@/modules/insight/utils/sample-prompts";
import { FC } from "react";

interface SamplePromptProps {
  onPromptClick: (content: string) => void;
}

export const SamplePrompts: FC<SamplePromptProps> = ({ onPromptClick }) => {
  return (
    <div>
      <p className="text-silver text-md mb-2">SAMPLE PROMPTS</p>
      <div className="flex flex-col gap-2">
        {samplePrompts.map((prompt) => (
          <SamplePrompt
            key={prompt.id}
            onClick={() => {
              onPromptClick(prompt.content);
            }}
          >
            {prompt.content}
          </SamplePrompt>
        ))}
      </div>
    </div>
  );
};
