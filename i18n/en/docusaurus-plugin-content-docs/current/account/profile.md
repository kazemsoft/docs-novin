---
id: profile
title: Profile and Security
sidebar_label: Profile and security
sidebar_position: 2
description: Manage your profile information and change your password in the Novin Cloud console.
---

# Profile and Account Security

The [Profile](https://console.novin.cloud/dashboard/profile) page shows your account information.

## Editable information

Clicking **"Edit information"** lets you change the following:

**Individual account:** first name, last name, national ID

**Legal entity account:** company name, national ID, postal code, registration number, economic code, address

## Non-editable information

| Field | Description |
|---|---|
| **Email** | Cannot be changed from the console |
| **Mobile number** | Can only be changed through the verification process |
| **Account type** | Individual or legal entity; cannot be changed after registration |

To change your email or account type, request it via a [support ticket](https://console.novin.cloud/dashboard/tickets).

## Changing your password

From the **"Account security"** section, click **"Change password"**. Enter your current password and a new password (at least 8 characters).

If you see the message "Current password is incorrect," you haven't entered your current password correctly. If you've forgotten your current password, use [password recovery](./registration.md#forgot-your-password).

## Security tips

:::tip Security recommendations
- Use a **unique** password for your Novin Cloud account — one you haven't used on any other service.
- Keep your password in a **password manager**.
- Choose a password for your cloud servers that's separate from your console account password.
- On Linux servers, after creating the server, replace password login with an [SSH key](../cloud-servers/access.md).
:::

:::note Two-factor authentication
Two-factor authentication (2FA) is not currently available for console login. Mobile number verification is a mandatory step during registration and is not considered a substitute for 2FA.
:::
