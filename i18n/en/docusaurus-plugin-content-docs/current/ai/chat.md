---
id: chat
title: Chat
sidebar_label: Chat
sidebar_position: 5
description: Using the Novin Cloud AI chat interface in the user console and at chat.novin.cloud, with no coding required.
---

# Chat

If you want to work with the models without writing code, you have two chat interfaces available.

## In-console chat

The **AI → Chat** section of the [user console](https://console.novin.cloud/dashboard/ai/chat) is a lightweight conversational environment — suited to quickly trying out models, comparing responses, and everyday tasks.

### Prerequisite: an API key

To use chat, you must first create **an active API key** and select it from the side menu. Chat uses that same key to send requests, so its usage is also recorded under that key.

If you don't have a key yet, see the [API Keys](./api-keys.md) guide.

### Starting a conversation

1. From the side menu, select an **active API key**.
2. Choose the desired **model** from the list at the top of the page.
3. Click **New Chat**.
4. Write your message and press `Enter`.

To go to a new line without sending the message, use `Shift + Enter`.

### Streamed responses

The model's response is displayed **incrementally, word by word**; you don't need to wait until the response is fully generated.

If the response gets too long or you don't like where it's headed, you can stop generation with the **Stop** button. The text generated up to that point remains.

:::note Cost of a stopped response
Tokens generated up to the moment of stopping are still billed. Stopping early prevents further cost, but it doesn't refund what was already consumed.
:::

### Switching models

You can switch models at any time. Conversations for each model are saved separately in the side list.

Comparing several models' responses to the same question is the best way to choose the right model for your project.

### Session token counter

At the bottom of the input box, the number of tokens consumed in the current conversation is displayed. This number is an **estimate** and may differ slightly from the final billed amount; for the exact figure, see the [Usage](./usage-billing.md) page.

### Conversation history

Your conversations are kept in the side list, and you can return to any of them by clicking on it.

:::warning History is local
Console chat conversations are stored in **your browser**. If you clear your browser data or switch devices or browsers, these conversations won't be available. For important conversations, save the text separately, or use [chat.novin.cloud](#dedicated-chat-interface) instead.
:::

### An important note about model memory

The model has no independent memory. With every message, **the entire conversation history** is sent to the model again so it can follow the thread of discussion.

The practical result: the longer a conversation gets, the more expensive each new message becomes. For a new topic, start a **new chat** — it's both cheaper and produces more accurate responses.

## Dedicated chat interface

For more serious work, a more complete interface is available at **[chat.novin.cloud](https://chat.novin.cloud)**.

### Signing in

You sign in with **the same Novin Cloud account** — no need to create a new account. Sign-in is handled through the Novin Cloud authentication system.

### Differences from console chat

| Feature | Console chat | chat.novin.cloud |
|---|---|---|
| Use case | Quick testing, access alongside other services | Everyday conversation and ongoing work |
| History | In the browser | On the server, accessible from any device |
| Requires creating an API key | Yes | No |
| Features | Basic | More complete |

:::tip Which one should I choose?
If you're developing and want to try out models alongside your other cloud services, use **console chat**. If you're looking for an everyday assistant with persistent history, use **chat.novin.cloud**.
:::

## Common chat errors

| Error message | Cause | Solution |
|---|---|---|
| Insufficient balance | Wallet is empty | [Top up your wallet](https://console.novin.cloud/dashboard/wallet) |
| Rate limit | Exceeded the key's `RPM` or `TPM` limit | Wait a moment or increase the key's limit |
| General error | Temporary network or service issue | Try again; if it persists, [file a ticket](https://console.novin.cloud/dashboard/tickets) |

## Next steps

- [Models](./models.md) — choosing the right model
- [Usage & Billing](./usage-billing.md) — tracking conversation costs
- [Quickstart](./quickstart.md) — using these same models in code
