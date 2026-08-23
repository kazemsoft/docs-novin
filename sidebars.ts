import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: "category",
      label: "شروع کار",
      collapsed: false,
      items: ["getting-started/introduction"],
    },
    {
      type: "category",
      label: "هوش مصنوعی",
      collapsed: false,
      items: [
        "ai/about",
        "ai/quickstart",
        "ai/api-keys",
        "ai/models",
        "ai/chat",
        "ai/usage-billing",
        "ai/api-reference",
      ],
    },
  ],
};

export default sidebars;
