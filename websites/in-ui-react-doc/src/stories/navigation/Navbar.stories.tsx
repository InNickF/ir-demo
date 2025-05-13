import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Navbar,
  NavbarProps,
  Title,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Navbar",
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Navbar> = (args) => {
  const scrollDiv = {
    height: "2000px",
    width: "80%",
    margin: "0 auto",
  };
  return (
    <>
      <Navbar {...args}>Navigation Bar</Navbar>
      <section style={scrollDiv}>
        <Title kind="h4">Title</Title>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima vitae
          beatae quae molestiae vero amet in eum, mollitia error necessitatibus
          velit repudiandae totam praesentium dolorum nulla illum ipsa corporis,
          natus voluptate eius voluptatibus cupiditate adipisci! Alias facilis,
          debitis dignissimos, autem obcaecati et, odit expedita quidem non
          atque sapiente corrupti officiis. Consectetur modi rem facere quod
          dolorem non dicta atque id repellendus eligendi doloremque autem
          veniam assumenda itaque impedit sed iste fugit qui inventore corrupti
          dignissimos at, numquam accusamus omnis. Corporis perspiciatis
          suscipit recusandae eos, omnis ratione, quod alias, at corrupti
          doloremque provident fuga! Laboriosam dolor fugiat ipsa ut, facilis
          libero eos, vitae error, perferendis debitis praesentium ducimus
          magnam sapiente mollitia commodi cum et consectetur? Aut vero
          perferendis quae omnis nemo id fuga! Debitis itaque assumenda nisi
          neque, non, provident vel id maxime repudiandae sequi veritatis
          excepturi esse minus fugiat? Perspiciatis, nesciunt. Beatae fugit,
          saepe aliquam dignissimos explicabo autem consequatur fuga quod optio
          dolore voluptates expedita. Sit sunt nam, odio blanditiis quis
          incidunt voluptatibus ducimus! Vero, saepe quas. Nihil corporis illum
          sapiente vel sint error voluptatum sunt saepe fuga, beatae totam
          deserunt ipsam, ducimus architecto, quis repudiandae reiciendis vitae
          possimus atque est eius hic quo laborum laboriosam. Cum obcaecati
          veritatis itaque!
        </p>
      </section>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {} as NavbarProps;

export const WithHorizontalPadding = Template.bind({});
WithHorizontalPadding.args = {
  paddingX: "both",
} as NavbarProps;
