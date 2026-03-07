export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  image_url: string
  tech_stack: string[]
  features?: string[]
  demo_url?: string
  repo_url?: string
  created_at: string
  updated_at: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  issue_date: string
  expiry_date?: string
  credential_url?: string
  image_url: string
  created_at: string
}

export interface Comment {
  id: string
  user_name: string
  email?: string
  content: string
  created_at: string
  is_approved: boolean
  is_pinned?: boolean
  profile_image?: string
}

export interface Profile {
  id: string
  role: 'admin' | 'user'
  created_at: string
  updated_at: string
}
