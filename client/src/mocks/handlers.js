import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:4060/campgrounds', (req, res, ctx) => {
    return res(
      ctx.json([
      {
        "description":
          'Quiet location, not easy to get there, but definitely worth.\nThere is no services or facilities around so take what you need AND leave nothing behind.\nCool trails around and lots of lakes.',
        "image":
          'https://firebasestorage.googleapis.com/v0/b/road-trip-app-4e757.appspot.com/o/images%2Fdownload.jpg?alt=media&token=fef67451-44b2-4f31-9955-80ef820da076',
        "location": {
         " longitude": '42.68089187526317',
          "latitude": '1.3365159569505352',
        },
        "name": 'Alt Pirineu - in the valley',
        "_id": '633189d2b59d42195c2729a9',
      },
      {
        "description":
          '"Picnic park with water source. Beautiful view over Rio Zêzere.\nGood spots around, close to the main road where you can park',
        "image":
          'https://firebasestorage.googleapis.com/v0/b/road-trip-app-4e757.appspot.com/o/images%2Fdownload.jpg?alt=media&token=fef67451-44b2-4f31-9955-80ef820da076',
        "location": {
          "longitude": '-8.263367728132948',
          "latitude": '39.76701617370941',
        },
        "name": 'Parque de Merendas Nossa Senhora do Pranto',
        "_id": '633189d2b59d42195c2729a9',
      },
      {
        "description":
          'Amazing experience. These are all private property but all you have to do is ask the owner their permission.',
        "image":
          'https://firebasestorage.googleapis.com/v0/b/road-trip-app-4e757.appspot.com/o/images%2Fdownload.jpg?alt=media&token=fef67451-44b2-4f31-9955-80ef820da076',
        "location": {
          "longitude": '0.45129167121007185',
          "latitude": '44.02599666560843',
        },
        "name": 'Camping in the vineyards',
        "_id": '6333f176303527ee323afb2f',
      },
    ]));
  }),

  rest.get('http://localhost:4060/campgrounds/:id', (req, res, ctx) => {
    const campgroundId = req.url.pathname
    return res(ctx.json({ campgroundId}))
  }),

  rest.post('http://localhost:4060/campgrounds', (req, res, ctx) => {
    if (req(ctx.body)) {return res(
      ctx.json({success: true})
    ) } else  res(ctx.json('Failure to post in DB'))
  }),
];









