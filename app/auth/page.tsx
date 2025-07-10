import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants'

export default function AuthPage() {
  redirect(ROUTES.SIGN_IN)
} 