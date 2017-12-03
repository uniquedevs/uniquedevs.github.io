export const SEARCH_CONTACT = 'SEARCH_CONTACT';

export function searchContacts(payload) {
    return {
        type: SEARCH_CONTACT,
        payload
    }
}