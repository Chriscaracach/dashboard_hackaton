const OWNER = import.meta.env.VITE_GITHUB_OWNER
const REPO = import.meta.env.VITE_GITHUB_REPO
const FILE_PATH = import.meta.env.VITE_GITHUB_FILE_PATH || 'data.json'
const BRANCH = import.meta.env.VITE_GITHUB_BRANCH || 'main'

const RAW_URL = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${FILE_PATH}`

export async function fetchData() {
  const res = await fetch(`${RAW_URL}?t=${Date.now()}`)
  if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`)
  return res.json()
}
