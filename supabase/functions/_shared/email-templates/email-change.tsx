/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body, Button, Container, Head, Heading, Html, Link, Preview, Text,
} from 'npm:@react-email/components@0.0.22'

interface EmailChangeEmailProps {
  siteName: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({ siteName, email, newEmail, confirmationUrl }: EmailChangeEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email change for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirm email change</Heading>
        <Text style={text}>
          You requested to change your MineTech email from{' '}
          <Link href={`mailto:${email}`} style={link}>{email}</Link> to{' '}
          <Link href={`mailto:${newEmail}`} style={link}>{newEmail}</Link>.
        </Text>
        <Button style={button} href={confirmationUrl}>Confirm change</Button>
        <Text style={footer}>
          If you didn't request this change, please secure your account immediately.
          <br />— The MineTech Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Montserrat', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: 'hsl(24, 30%, 15%)', margin: '0 0 20px', letterSpacing: '-0.01em' }
const text = { fontSize: '14px', color: 'hsl(24, 15%, 45%)', lineHeight: '1.6', margin: '0 0 24px' }
const link = { color: 'hsl(24, 78%, 24%)', textDecoration: 'underline' }
const button = { backgroundColor: 'hsl(24, 78%, 24%)', color: '#ffffff', fontSize: '14px', fontWeight: '500' as const, borderRadius: '4px', padding: '12px 24px', textDecoration: 'none', letterSpacing: '0.02em' }
const footer = { fontSize: '12px', color: 'hsl(24, 15%, 55%)', margin: '32px 0 0', lineHeight: '1.6' }
