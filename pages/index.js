 import Head from 'next/head';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Home({ nasadata, satelite, nasaimages, starwars }) {

  return (
    <>
      <Head>
        <title>NGmedia Onepage Demo</title>
        <meta name="description" content="This is a onepage demo website by ngmedia, build with api data from starwars api and nasa api."></meta>
      </Head>

      <main className="flex-shrink-0">

        <div className="d-none d-xl-block star star_01"></div>
        <div className="d-none d-xl-block star star_02"></div>

        <div className="container">
          {/* /////////////////// WELKOM TO NASA  /////////////////// */}
          <div className="hero">
            <h1 className="mt-5">Welcome to Nasa<span className='point'>.</span></h1>
            <p>This onepager demo website is based on the Nasa data api and the starwars api</p>
          </div>

          {/* /////////////////// NASA PICTURE OF THE DAY /////////////////// */}
          <section id="gallery">
            <div className="row">
              <h2 className="text-uppercase">Nasa Pictures<span className='point'>.</span></h2>
            </div>

            <Swiper
              modules={[Autoplay, Navigation, Pagination, Scrollbar]}
              breakpoints={{
                1200: {
                  slidesPerView: 1,
                },
                1201: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={0}
              autoplay={{
                delay: 5500,
                disableOnInteraction: false,
              }}
              navigation
              pagination={{
                type: "fraction",
              }}
              scrollbar={{ draggable: true }}
            >
              {nasadata.filter(nasadata => nasadata.media_type === "image").map((item, index) =>
                <SwiperSlide key={1}>
                  <div className="row m-3 m-lg-5 p-2">

                    <div className="col m-0 p-0">
                      <p className="datum m-0 pb-2">{item.date}</p>
                      <h3 className="h3_gallery">{item.title}</h3>

                    </div>

                    <div className="nasa_image" style={{ backgroundImage: `url(${item.url})` }}></div>

                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </section>

          {/* /////////////////// STARWARS HEROES /////////////////// */}
          <section id="heroes">
            <div className="row">
              <h2 className="text-uppercase">Top 10 famous space heroes<span className='point'>.</span></h2>
            </div>
            <div className="row m-2 p-2">
              <Tabs>
                <TabList>
                  {starwars.results && starwars.results.map((item, i) =>
                    <Tab key={0}>
                      {item.name}
                    </Tab>
                  )}
                </TabList>

                {starwars.results && starwars.results.map((item, i) =>
                  <TabPanel key={0}>
                    <div className="row g-lg-4 align-items-center">

                      <div className="col-lg-7 p-4">
                        <div className="nasa_image" style={{ backgroundImage: `url('/images/${item.name}.jpg')` }}></div>
                      </div>

                      <div className="col-lg-5 p-4">
                        <div className="row p-4">
                          <div className="col-6">
                            <p>Name</p>
                            <p>Gender</p>
                            <p>Birthdate</p>
                          </div>
                          <div className="col-6">
                            <p>{item.name}</p>
                            <p> {item.gender}</p>
                            <p>{item.birth_year}</p>
                          </div>

                          <hr></hr>
                          <div className="col-6">
                            <p>Mass</p>
                            <p>Skincolor</p>
                            <p>Eyecolor</p>
                            <p>Haircolor</p>
                          </div>
                          <div className="col-6">
                            <p> {item.mass}</p>
                            <p>{item.skin_color}</p>
                            <p> {item.eye_color}</p>
                            <p>{item.hair_color}</p>
                          </div>

                        </div>

                      </div>

                    </div>
                  </TabPanel>
                )}
              </Tabs>

            </div>
          </section>

          {/* /////////////////// SALTELITE INFO /////////////////// */}
          <section id="satelites">
            <div className="row">
              <h2 className="text-uppercase">Top 20 most famous satelites<span className='point'>.</span></h2>
            </div>
            <div className="row m-5 p-2">
              <ul className="satelites">
                {satelite.member && satelite.member.map((item, i) =>
                  <li key={i}>
                    <h3>{item.name} </h3>
                  </li>
                )}
              </ul>
            </div>
          </section>

          {/* /////////////////// NASA BLOG /////////////////// */}
          <section id="news">
            <div className="row ">
              <h2 className="text-uppercase mb-4">Latest news from Nasa & mars<span className='point'>.</span></h2>
            </div>
            <Swiper
              pagination={{
                type: "progressbar",
              }}
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              navigation={true} 
            >
              {nasaimages.collection.items && nasaimages.collection.items.map((item, i) =>
                <SwiperSlide key={2}>
                  <div className="row m-lg-5 p-4 align-items-center">
                    <div className="col-12 col-xl-6 p-2">
                      {/* {item.links[0].href} */}
                      <h3 className="h3_blog_news">{item.data[0].title} </h3>
                      <p className="datum m-0 pb-2">{item.data[0].date_created} | {item.data[0].secondary_creator}  </p>
                      <div className="blog_content">
                        <p>{item.data[0].description} </p>
                      </div>
                    </div>
                    <div className="col-12  col-xl-6 p-4">
                      <div className="nasa_blog_image" style={{ backgroundImage: `url(${item.links[0].href})` }}></div>
                    </div>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </section>

        </div>
      </main >
    </>
  )
}


export async function getStaticProps({ context }) {

  const [nasadataRes, sateliteRes, nasaimagesRes, starwarsRes] = await Promise.all([
    // fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=100&camera=MAST&page=1&api_key=${process.env.NASA_API}`),
    //fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.NASA_API}&feedtype=json&ver=1.0`),
    //fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${process.env.NASA_API}`),
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}&count=14&concept_tags=true`),
    fetch(`https://tle.ivanstanojevic.me/api/tle/`),
    fetch(`https://images-api.nasa.gov/search?q=mars%2022&description=mars&media_type=image`),
    fetch(`https://swapi.dev/api/people`)
  ]);
  const [nasadata, satelite, nasaimages, starwars] = await Promise.all([
    nasadataRes.json(),
    sateliteRes.json(),
    nasaimagesRes.json(),
    starwarsRes.json()
  ]);
  return { props: { nasadata, satelite, nasaimages, starwars } };
} 