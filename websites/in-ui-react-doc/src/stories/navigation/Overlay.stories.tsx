import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Overlay, OverlayProps } from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Overlay",
  component: Overlay,
} as ComponentMeta<typeof Overlay>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Overlay> = (args) => {
  return (
    <>
      <h2>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae id
        adipisci fugiat odio laborum. Totam temporibus fuga ullam ex
        reprehenderit, debitis quae error provident molestias alias, nam
        asperiores sit illo! Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Corporis libero numquam minus accusamus aut quos alias blanditiis
        inventore sit impedit, veniam cum? Deleniti sed mollitia numquam, eos
        illum officia reprehenderit. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Nulla corporis enim maxime libero hic amet autem cum
        praesentium ab iusto adipisci architecto, ratione alias, officiis nam
        molestiae laboriosam. Veritatis, laudantium. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptatem cupiditate deserunt hic qui
        inventore! Dolor vero quas, dolorem corporis qui quidem minima inventore
        earum placeat nihil, iusto, nobis enim repudiandae!
      </h2>
      <Overlay {...args} portal={false} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {} as OverlayProps;
