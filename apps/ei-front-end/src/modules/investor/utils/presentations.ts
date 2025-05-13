import { Presentation } from "@/investor/typings/presentations";

// Use it after any special EMBED link provided by figma (The non-embed ones won't work).
const customFigmaFeatures =
  "&hide-ui=1&hotspot-hints=0&hide-ui=1&scaling=contain&content-scaling=fixed";

export const presentations: Presentation[] = [
  {
    id: "pitchbook",
    name: "Pitchbook",
    link: `https://embed.figma.com/proto/p7BG057N8Qwv20s6C861I9/Presentations?page-id=2291%3A9709&node-id=2291-21318&node-type=frame&viewport=-12080%2C4206%2C0.3&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2291%3A21318&embed-host=share${customFigmaFeatures}`,

    // Original one link: `https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fp7BG057N8Qwv20s6C861I9%2FPresentation%3Fpage-id%3D0%253A1%26type%3Ddesign%26node-id%3D1-2%26viewport%3D559%252C364%252C0.13%26t%3DW05rXP7dqngDmxKV-1%26scaling%3Dcontain%26starting-point-node-id%3D1%253A2",
  },
  /*   {
    id: "fund-v-lpac",
    name: "Fund V LPAC",
    link: `https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fp7BG057N8Qwv20s6C861I9%2FPresentations%3Fpage-id%3D757%253A8694%26type%3Ddesign%26node-id%3D757-10490%26viewport%3D640%252C78%252C0.03%26t%3DX3cBQrSKt74If1GC-1%26scaling%3Dcontain%26starting-point-node-id%3D757%253A10490${customFigmaFeatures}`,
  }, */
];
