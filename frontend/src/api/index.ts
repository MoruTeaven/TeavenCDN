export interface PackageItem {
  id: number
  name: string
  version: string
  file_name: string
  file_path: string
  source_url?: string
  source_type?: string
  file_size?: number
  content_type?: string
  created_at: string
  cdn_url?: string
  global_cdn_url?: string
}

export interface SearchResult {
  name: string
  versions: string[]
  latest: string
}

interface ErrorResponse {
  error?: string
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
    this.name = 'ApiError'
  }
}

async function createApiError(response: Response, fallback: string) {
  let message = fallback

  try {
    const data = await response.json() as ErrorResponse
    if (data.error) {
      message = data.error
    }
  } catch {
    // Keep the fallback message when the server response is not JSON.
  }

  return new ApiError(message, response.status)
}

function getAuthHeaders(headers: Record<string, string> = {}) {
  const token = localStorage.getItem('admin_token')
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers
}

export const api = {
  async search(q: string): Promise<SearchResult> {
    const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    if (!response.ok) {
      throw await createApiError(response, 'Search failed')
    }
    return await response.json()
  },

  async favorite(name: string, version: string): Promise<{ success: boolean, package: PackageItem }> {
    const response = await fetch('/api/favorite', {
      method: 'POST',
      headers: getAuthHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ name, version })
    })
    if (!response.ok) {
      throw await createApiError(response, 'Favorite failed')
    }
    return await response.json()
  },

  async getPackages(): Promise<{ packages: PackageItem[] }> {
    const response = await fetch('/api/packages', {
      headers: getAuthHeaders()
    })
    if (!response.ok) {
      throw await createApiError(response, 'Get packages failed')
    }
    return await response.json()
  },

  async deletePackage(id: number): Promise<void> {
    const response = await fetch(`/api/packages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    if (!response.ok) {
      throw await createApiError(response, 'Delete failed')
    }
  }
}
