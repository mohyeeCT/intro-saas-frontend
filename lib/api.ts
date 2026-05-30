const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://intro-saas-backend-production.up.railway.app').replace(/\/+$/, '')

async function apiFetch(path: string, token: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || 'Request failed')
  }
  return res.json()
}

export async function runJob(token: string, payload: object) {
  return apiFetch('/api/intro/run', token, { method: 'POST', body: JSON.stringify(payload) })
}

export async function listJobs(token: string) {
  return apiFetch('/api/jobs', token)
}

export async function getJob(token: string, jobId: string) {
  return apiFetch(`/api/jobs/${jobId}`, token)
}

export async function deleteJob(token: string, jobId: string) {
  return apiFetch(`/api/jobs/${jobId}`, token, { method: 'DELETE' })
}

export async function renameJob(token: string, jobId: string, name: string) {
  return apiFetch(`/api/jobs/${jobId}/rename`, token, { method: 'PATCH', body: JSON.stringify({ name }) })
}

export async function duplicateJob(token: string, jobId: string) {
  return apiFetch(`/api/jobs/${jobId}/duplicate`, token, { method: 'POST' })
}

export async function rerunRow(token: string, jobId: string, rowIndex: number, keywordOverride?: string) {
  return apiFetch(`/api/jobs/${jobId}/rerun-row/${rowIndex}`, token, {
    method: 'POST',
    body: JSON.stringify({ keyword_override: keywordOverride || '' }),
  })
}

export async function getSettings(token: string) {
  return apiFetch('/api/settings', token)
}

export async function saveSettings(token: string, payload: object) {
  return apiFetch('/api/settings', token, { method: 'PUT', body: JSON.stringify(payload) })
}

export async function deleteGscAccount(token: string) {
  return apiFetch('/api/settings/gsc', token, { method: 'DELETE' })
}

export async function getProviderCredentials(token: string) {
  return apiFetch('/api/settings/provider-credentials', token)
}

export async function saveProviderCredentials(token: string, payload: {
  provider?: string; api_key?: string; dfs_login?: string; dfs_password?: string; jina_api_key?: string
}) {
  return apiFetch('/api/settings', token, { method: 'PUT', body: JSON.stringify({ provider_settings: payload }) })
}

export async function deleteCredentials(token: string) {
  return apiFetch('/api/settings/credentials', token, { method: 'DELETE' })
}

export async function listTemplates(token: string, tool = 'intro') {
  return apiFetch(`/api/settings/templates?tool=${tool}`, token)
}

export async function saveTemplate(token: string, name: string, settings: object, tool = 'intro') {
  return apiFetch('/api/settings/templates', token, {
    method: 'POST',
    body: JSON.stringify({ name, tool, settings }),
  })
}

export async function deleteTemplate(token: string, templateId: string) {
  return apiFetch(`/api/settings/templates/${templateId}`, token, { method: 'DELETE' })
}

export async function listBrandProfiles(token: string) {
  return apiFetch('/api/settings/brand-profiles', token)
}

export async function createBrandProfile(token: string, name: string, data: object) {
  return apiFetch('/api/settings/brand-profiles', token, {
    method: 'POST', body: JSON.stringify({ name, data }),
  })
}

export async function updateBrandProfile(token: string, id: string, name: string, data: object) {
  return apiFetch(`/api/settings/brand-profiles/${id}`, token, {
    method: 'PUT', body: JSON.stringify({ name, data }),
  })
}

export async function deleteBrandProfile(token: string, id: string) {
  return apiFetch(`/api/settings/brand-profiles/${id}`, token, { method: 'DELETE' })
}

export async function cancelJob(token: string, jobId: string) {
  return apiFetch(`/api/jobs/${jobId}/cancel`, token, { method: 'POST' })
}

export async function rerunRows(token: string, jobId: string, rowIndices: number[]) {
  return apiFetch(`/api/jobs/${jobId}/rerun-rows`, token, {
    method: 'POST',
    body: JSON.stringify({ row_indices: rowIndices }),
  })
}
