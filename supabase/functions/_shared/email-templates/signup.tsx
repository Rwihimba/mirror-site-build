/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body, Button, Container, Head, Heading, Html, Link, Preview, Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({ siteName, siteUrl, recipient, confirmationUrl }: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirm your email</Heading>
        <Text style={text}>
          Welcome to <Link href={siteUrl} style={link}><strong>MineTech</strong></Link>. Please confirm{' '}
          <Link href={`mailto:${recipient}`} style={link}>{recipient}</Link> to activate your account.
        </Text>
        <Button style={button} href={confirmationUrl}>Verify email</Button>
        <Text style={footer}>
          If you didn't create an account, you can safely ignore this email.
          <br />— The MineTech Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Montserrat', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: 'hsl(24, 30%, 15%)', margin: '0 0 20px', letterSpacing: '-0.01em' }
const text = { fontSize: '14px', color: 'hsl(24, 15%, 45%)', lineHeight: '1.6', margin: '0 0 24px' }
const link = { color: 'hsl(24, 78%, 24%)', textDecoration: 'underline' }
const button = { backgroundColor: 'hsl(24, 78%, 24%)', color: '#ffffff', fontSize: '14px', fontWeight: '500' as const, borderRadius: '4px', padding: '12px 24px', textDecoration: 'none', letterSpacing: '0.02em' }
const footer = { fontSize: '12px', color: 'hsl(24, 15%, 55%)', margin: '32px 0 0', lineHeight: '1.6' }
