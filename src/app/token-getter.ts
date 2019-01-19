export function tokenGetter() {
    if (localStorage.getItem('currentUser') == null)
    {
      return;
    }
    return JSON.parse(localStorage.getItem('currentUser'));
  }
export class TokenGetter {
}
