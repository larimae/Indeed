// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    avatar_url: string; // URL for the avatar image
    name: string | null; // Name of the candidate, may be null
    login: string; // GitHub username
    location: string | null; // Location of the candidate, may be null
    company: string | null; // Company name, may be null
    html_url: string; // URL for the GitHub profile
}