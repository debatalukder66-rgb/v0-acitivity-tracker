import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username') || 'deba9t6'
    const score = searchParams.get('score') || '12'
    const displayName = searchParams.get('displayName') || 'User'
    const pfpUrl = searchParams.get('pfpUrl') || 'https://i.pravatar.cc/150?u=default&d=identicon'

    const usernameDisplay = username.startsWith('@') ? username : `@${username}`

    return new ImageResponse(
      (
        <svg width="500" height="550" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="outerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#fb923c', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="innerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#a78bfa', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#d8b4fe', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f472b6', stopOpacity: 1 }} />
            </linearGradient>
            <clipPath id="avatarClip">
              <circle cx="250" cy="120" r="50" />
            </clipPath>
          </defs>
          <rect width="500" height="550" fill="url(#outerGrad)" />
          <rect x="12" y="12" width="476" height="526" rx="24" fill="url(#innerGrad)" />
          <image x="200" y="70" width="100" height="100" href={pfpUrl} clipPath="url(#avatarClip)" />
          <circle cx="250" cy="120" r="50" fill="none" stroke="white" strokeWidth="4" />
          <text x="250" y="180" fontSize="28" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="system-ui">{displayName}</text>
          <text x="250" y="210" fontSize="18" fill="rgba(255,255,255,0.9)" textAnchor="middle" fontFamily="system-ui">{usernameDisplay}</text>
          <text x="250" y="250" fontSize="16" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontFamily="system-ui">Avg Engagement Score</text>
          <text x="250" y="330" fontSize="72" fontWeight="900" fill="white" textAnchor="middle" fontFamily="system-ui">{score}</text>

        </svg>
      ),
      {
        width: 500,
        height: 550,
      },
    )
  } catch (error) {
    console.error('[v0] Error generating card:', error)
    return new Response('Error generating card', { status: 500 })
  }
}
