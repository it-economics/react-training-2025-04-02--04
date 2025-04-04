import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post(/\/login/i, async ({ request }) => {
    await delay();
    const auth = request.headers.get('authorization');
    if (auth?.startsWith('Basic abc')) return HttpResponse.json({token: 'your-token'})

    return HttpResponse.json({error: 'Not okay'}, {status: 500})
  }),

  http.get('/api/notes', async () => {
    await delay();
    return HttpResponse.json({notes: {abc: {id: 'abc', title: 'First one'}, def: {id: 'def', title: 'Second one'}}})
  })
]
