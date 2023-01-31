--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    user_id integer,
    hotel_id integer,
    room_id integer,
    check_in_date date NOT NULL,
    check_out_date date NOT NULL
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bookings_booking_id_seq OWNER TO postgres;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_booking_id_seq OWNED BY public.bookings.booking_id;


--
-- Name: hotels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotels (
    hotel_id integer NOT NULL,
    hotel_name character varying,
    location_id integer NOT NULL,
    hotel_img character varying,
    hotel_description character varying,
    hotel_description_2 character varying
);


ALTER TABLE public.hotels OWNER TO postgres;

--
-- Name: hotels_hotel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hotels_hotel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hotels_hotel_id_seq OWNER TO postgres;

--
-- Name: hotels_hotel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hotels_hotel_id_seq OWNED BY public.hotels.hotel_id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    location_id integer NOT NULL,
    location_name character varying,
    country character varying,
    img character varying,
    country_flag character varying
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: locations_location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locations_location_id_seq OWNER TO postgres;

--
-- Name: locations_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locations_location_id_seq OWNED BY public.locations.location_id;


--
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    room_id integer NOT NULL,
    room_name character varying,
    hotel_id integer NOT NULL,
    room_img_1 character varying,
    room_img_2 character varying,
    room_img_3 character varying,
    room_capacity integer,
    room_rate integer
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- Name: rooms_room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rooms_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rooms_room_id_seq OWNER TO postgres;

--
-- Name: rooms_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rooms_room_id_seq OWNED BY public.rooms.room_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying,
    email character varying,
    user_password character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: bookings booking_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.bookings_booking_id_seq'::regclass);


--
-- Name: hotels hotel_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels ALTER COLUMN hotel_id SET DEFAULT nextval('public.hotels_hotel_id_seq'::regclass);


--
-- Name: locations location_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations ALTER COLUMN location_id SET DEFAULT nextval('public.locations_location_id_seq'::regclass);


--
-- Name: rooms room_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms ALTER COLUMN room_id SET DEFAULT nextval('public.rooms_room_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (booking_id, user_id, hotel_id, room_id, check_in_date, check_out_date) FROM stdin;
\.


--
-- Data for Name: hotels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotels (hotel_id, hotel_name, location_id, hotel_img, hotel_description, hotel_description_2) FROM stdin;
3	Orida Maidstone	4	https://img.grouponcdn.com/deal/YTrUuoREJd6FgS84j8ZnZdmxt3P/YT-960x577/v1/c870x524.jpg	This modern Orida hotel has spacious rooms, an indoor pool and a well-equipped gym. Maidstone town center is within a 10-minute drive and the M20 motorway is less than 0.5 miles away. 	\nThis modern Orida hotel has spacious rooms, an indoor pool and a well-equipped gym. Maidstone town center is within a 10-minute drive and the M20 motorway is less than 0.5 miles away.\n\nOrida Health club has a steam room, a state-of-the-art sauna and a spa bath. There is also a treatment room offering beauty therapies and massages.\n\nThe rooms at at Orida Maidstone feature 49-inch TVs, work desks and tea/coffee facilities. The hotel also offers 24-hour room service.\n\nSeasons Restaurant serves both modern and traditional dishes. Guests can also enjoy coffee and evening drinks in the café and bar.\n\nA wide range of hot and cold options are provided with the buffet breakfast. Children under 12 years eat and drink free from the children’s menu when parents dine in the restaurant.\n\nOrida Maidstone is 4 miles from Leeds Castle. Gatwick Airport is within a 45-minute drive.\n\nCouples in particular like the location – they rated it 8.5 for a two-person trip. \n
4	Hotel Della Posta	2	https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/06/bc/d4/the-gritti-palace-a-luxury.jpg?w=900&h=-1&s=1	Centrally located in Venice, Hotel della Posta offers rooms with free Wi-Fi and cable TV. It features a classic Italian restaurant. The main railway station is just a 1-minute walk away.	\n\n\nSet in the main square of the picturesque city of Vanice, Grand Hotel Della Posta is a charming hotel which maintains its 19th century heritage.\n\nIts original stone-walled cellar area is an enchanting setting to start your day having breakfast. This characteristic room also doubles as a fully-equipped meeting room for all your business engagements.\n\n\nThe Hotel Della Posta has been restored with great attention to detail and has spacious and comfortable guest rooms featuring works of art by the Italian artist Martini. They feature free Wi-Fi.\n\nTry some regional specialties in the elegant restaurant and bar and relax in the hotel’s complete spa.\n\nCouples in particular like the location – they rated it 9.7 for a two-person trip. \n
5	Hotel Laguna	2	https://cf.bstatic.com/xdata/images/hotel/max1024x768/304944507.jpg?k=7363e435a3614c513c3da15ad0716186b0f2d55a25a90925b4362b7d85434cb5&o=&hp=1	Hotel Laguna provides accommodation with free WiFi, 100 m from St Mark's Square. Guests staying at this apartment have access to a fully equipped kitchen and a balcony.	\nHotel Laguna is located in Venice and features a terrace and a bar. This 4-star hotel offers free WiFi. The property is close to popular attractions like Ca d Oro, Rialto Bridge and San Michele Cemetery.\n\nGuest rooms at the hotel are fitted with a seating area, a TV with satellite channels and a private bathroom with free toiletries and a bath.\n\nOur hotel offers some units with views of Rialto Bridge, and all rooms come with a coffee machine. All units include a desk.\n\nSpeaking English and Spanish at the 24-hour front desk, staff are always on hand to help.\n\nSan Michele Cemetery is 750 yards from the accommodations, while Basilica San Marco is 750 yards from the property.\n\nVenice Marco Polo Airport is 13 mi away.\n\nThis is our guests favorite part of Venice, according to independent reviews. \n
8	Home House	1	https://www.findmeaconference.com/venueimages/2147909314/main/bf89ea99-97ba-45c2-ae79-badcb9ba2a72-lutonhoohoteldrawingr.jpg	Subway Access\nWell set in London, Home House Portman Square provides air-conditioned rooms, a fitness center, free WiFi and a garden. 	\n\n\nWell set in London, Home House Portman Square provides air-conditioned rooms, a fitness center, free WiFi and a garden. Each room at the 5-star hotel has city views, and guests can enjoy access to a terrace and to a sauna. The property has nightclub and room service.\n\nAt the hotel, every room has a desk, a flat-screen TV, a private bathroom, bed linen and towels. All guest rooms include a safety deposit box.\n\nAt Home House Portman Square you will ll find a restaurant serving British cuisine. Vegetarian, dairy-free and gluten-free options can also be requested.\n\nStaff at the accommodation are available to give guidance at the 24-hour front desk.\n\nPopular points of interest near Home House Portman Square include Madame Tussaud s, Oxford Circus Tube Station and Oxford Street. The nearest airport is London City Airport, 11 miles from the hotel.\n\nThis is our guests  favorite part of London, according to independent reviews.\n\nCouples in particular like the location – they rated it 9.6 for a two-person trip. \n
7	Dorchester Hotel	1	https://www.thescottishsun.co.uk/wp-content/uploads/sites/2/2016/10/nintchdbpict000285683318.jpg?strip=all&w=1200&h=800&crop=1	A London landmark and a destination in itself. The Dorchester invites you to make your own mark on the ever-evolving legacy of this amazing city.	\nLondon is one of the world’s most impressive capital cities with a unique and vibrant blend of history and culture. We’re here to guide you through a seemingly endless number of museums, galleries, public parks and attractions to decide what’s right for your visit and the best way to make some great memories of your time in this lovely city.\n
2	Village Hotel	4	https://th.bing.com/th/id/R.f1da8064d46cee4ceae3fb8556e6f972?rik=5cZ2TfaeiwDASw&riu=http%3a%2f%2fwww.bigvenuebook.com%2fvenue-images%2fmain_image1382.jpg&ehk=T%2byctqqK1RVyZBIhbyjOepneFGdSw9NrAjvvYyVUyiE%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1	Village Hotel Maidstone is just 328 feet from the River Medway. It is also just 5 minutes  drive from Maidstone center, with direct access to the M20 motorway. 	\n\nVillage Hotel Maidstone is just 100 yards from the River Medway. It is also just 5 minutes drive from Maidstone town center, with direct access to the M20 motorway. With parking and free WiFi, the property offers extensive leisure facilities.\n\nAt an extra cost, guests can use the Village Gym, with a swimming pool, sauna and steam room.\n\nEach bedroom has a flat-screen TV with Sky TV and the Sky Sports channel. The rooms also includes a private bathroom with a hairdryer.\n\nDuring their stay, guests can dine at the Village Pub & Grill all day dining venue serving a variety of dishes including breakfasts, a great selection of fish and steaks, healthy options and scrumptious desserts. Guests can also enjoy a selection of hot drinks and snacks from the on-site Starbucks coffee shop.\n\nThe Business Clubs offer the perfect office away from home with inspired meeting spaces, hot desking, tasty refreshments and state of the art technology. Guests staying in standard rooms can add Business Club access at an additional charge.\n\nVillage Hotel Maidstone is set in an ideal location for exploring Kent. It is within easy reach of London.\n
1	Z Hotel-Gloucester Place	1	https://pix8.agoda.net/hotelImages/299/299939/299939_16101418130047771093.jpg?ca=6&ce=1&s=1024x768	The Z Hotel at Gloucester Place offers accommodations in London, half a mile from Selfridges & Co on Oxford Street, and within a 10-minute walk from Edgware Road Underground Station. 	\n\nThe Z Hotel at Gloucester Place offers accommodations in London, half a mile from Selfridges & Co on Oxford Street, and within a 10-minute walk from Edgware Road Underground Station.\n\nThe hotel features free WiFi and a 24-hour front desk with concierge. A breakfast buffet is served each morning, and guests are able to enjoy lunch each day in Z Café, and the on-site bar.\n\nEach air conditioned bedroom includes an en suite shower with a hairdryer and complimentary toiletries. Rooms offer a flat-screen TV with Sky channels, ironing facilities and a work desk. Some of the bedrooms include a seating area.\n\nGuests are within a 15-minute walk of Regent’s Park, and can reach ZSL London Zoo within 15 minutes by public transport. The Z Hotel at Gloucester Place is 1 miles from Paddington Station, where guests can take a train to Heathrow Airport in 17 minutes.\n
6	Hotel De La Playa	3	https://cf.bstatic.com/xdata/images/hotel/max1024x768/324085962.jpg?k=6e1f0b6c66de1eec871855c3e616bdfb55fc41f8ff2f16540dff04b40d817654&o=&hp=1	Facing the beachfront, Hotel Playa de la Plata offers 4-star accommodations in Barcelona and features an outdoor swimming pool, fitness center and garden.	\nFeaturing a private access to the beach, La Ritoqueña Hotel de La Playa is located on Ritoque Beach, 2.5 mi from Barcelona. This hotel is just 20 yards from the beach and offers views of the sea, mountains, and dunes. Free WiFi access is available in public areas.\n\nRooms here will provide you with a balcony. the private bungalow has two double rooms and a bathroom. You can enjoy a sea view from all of the rooms.\n\nAt La Ritoqueña Hotel de Playa you will find a garden, a terrace, and a snack bar. A shared lounge, a restaurant, and luggage storage are also available. The property offers free parking.\n
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locations (location_id, location_name, country, img, country_flag) FROM stdin;
4	Maidstone	United Kingdom	https://cdn.thecrazytourist.com/wp-content/uploads/2018/07/ccimage-shutterstock_67883020.jpg	https://www.svgrepo.com/show/401788/flag-for-united-kingdom.svg
1	London	United Kingdom	https://assets3.thrillist.com/v1/image/1606442/1584x1064/scale;webp=auto;jpeg_quality=60.jpg	https://www.svgrepo.com/show/401788/flag-for-united-kingdom.svg
2	Venice	Italy	https://cdn.contexttravel.com/image/upload/w_1500,q_60/v1661527052/blog/Our%20Top%2013%20Venice%20Attractions%20and%20Their%20Histories:%20What%20They%20Are%20and%20Why%20You%20Need%20to%20Visit%20%20%28venice%20attractions%29/venice_attractions_hero.jpg	https://www.svgrepo.com/show/401660/flag-for-italy.svg
6	Rome	Italy	https://www.fodors.com/assets/destinations/54492/colosseum-ancient-rome-rome-italy-europe_980x650.jpg	https://www.svgrepo.com/show/401660/flag-for-italy.svg
5	Paris	France	https://luxurylondon.co.uk/wp-content/uploads/2022/08/best-luxury-hotels-paris-2022-1465x1099-c-center.jpg	https://www.svgrepo.com/show/401605/flag-for-france.svg
3	Barcelona	Spain	https://media.timeout.com/images/105827631/750/422/image.jpg	https://www.svgrepo.com/show/401755/flag-for-spain.svg
8	Amsterdam	Netherlands	https://www.planetware.com/wpimages/2019/10/netherlands-in-pictures-most-beautiful-places-amsterdam.jpg	https://www.svgrepo.com/show/242257/netherlands-holland.svg
7	Santorini	Greece	https://media.timeout.com/images/105859749/750/422/image.jpg	https://www.svgrepo.com/show/401619/flag-for-greece.svg
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (room_id, room_name, hotel_id, room_img_1, room_img_2, room_img_3, room_capacity, room_rate) FROM stdin;
10	Family Room	2	https://cf.bstatic.com/xdata/images/hotel/max1024x768/382857331.jpg?k=86510d974aab3fc4756c156bbaa03bb275c073d4137fe69ceaf99355f5e8f329&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/382857330.jpg?k=0f17ba3bb23a59a25c4af69c1b3da8bed277adc445d4987c8c999954a1077677&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/382857274.jpg?k=006cd9d672b7223685420090bb482a7ba79a0c4c7be757cad461af6cb5eafb05&o=&hp=1	4	250
5	Stanza Singola	4	https://23c133e0c1637be1e07d-be55c16c6d91e6ac40d594f7e280b390.ssl.cf1.rackcdn.com/responsive/16:9/1200px/u/phhk/home/1a-Superior-Single-Room-min1.jpg	https://23c133e0c1637be1e07d-be55c16c6d91e6ac40d594f7e280b390.ssl.cf1.rackcdn.com/responsive/16:9/1200px/u/phhk/home/1b-Superior-Room-Toilet-min.jpg	https://www.ahstatic.com/photos/1313_wd_04_p_2048x1536.jpg	1	199
4	Stanza Doppia	4	https://webbox.imgix.net/images/scmwttivwljcinct/10391956-765b-41ea-9819-f87cb46bc436.jpg?auto=format,compress&fit=crop&crop=entropy&w=1366	https://webbox.imgix.net/images/scmwttivwljcinct/e16b39d7-c006-4000-b0dd-e94db0c59d33.jpg?auto=format,compress&fit=crop&crop=entropy&w=1366	https://webbox.imgix.net/images/scmwttivwljcinct/4948e02a-1d30-4ec9-9dee-4b95d19272e2.jpg?auto=format,compress&fit=crop&crop=entropy&w=1366	2	350
12	King Room	1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/171484051.jpg?k=d1365b9e6b216c2fb0e27553dbb55b4fb4f33b7070a02b7a3942bca74d0cb966&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/63722423.jpg?k=691fddcbab397bc73ba1a6e0c2c5f205e669b70f88894e756cba4822a75c308b&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/72107079.jpg?k=b765aaea2d29a128fec55f904ddcca24b8213fbe36a56be4721258980140ab62&o=&hp=1	2	180
6	Suite vista Piazza San Marco	4	https://cf.bstatic.com/xdata/images/hotel/max1024x768/290873520.jpg?k=59dace7713a08a6e494685466fa97c82f103ebfdca54c903a5298b1302381720&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/154194092.jpg?k=ee82a5edb8e0aafd05ecae0455691c9ca136f22043f2cd3eb65c43b1986538a4&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/215927596.jpg?k=9d2f1a6026e9a4de0b55507208b92948ab57f3577bc6a864212538abf4ce0cff&o=&hp=1	2	750
2	Doble habitaction	6	https://www.regencyhouse-hotel.com/wp-content/uploads/2016/05/Gower-073-800x504.jpg	https://www.regencyhouse-hotel.com/wp-content/uploads/2016/05/Gower-074-800x504.jpg	https://cf.bstatic.com/xdata/images/hotel/max1024x768/327050283.jpg?k=7735ee0b24923f5dc66185614b883c5eaa575d003056d2db7d76942054d9752b&o=&hp=1	2	70
8	Single Room	3	https://cf.bstatic.com/xdata/images/hotel/max1024x768/124392221.jpg?k=9af66e0c7012d0347e6dd12ff18d1e12df2885cec461fb064b9b0903c383521f&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/69884798.jpg?k=10586e65333bead55e6dfd7b11a32bc96fc9e0717a4db4942c27ea28753a7281&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/88866384.jpg?k=bc9041fd2f6e2d8332b377f05c9f7144920c6e912d3f08baf8a3d876c77febd7&o=&hp=1	1	90
11	Junior Suite	1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/362463004.jpg?k=e48da5ff2df09f32aff142df6e40e2344f874fcb2364f807df03f954b4cf8a7f&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/72107112.jpg?k=37c3340da3abc34bfa7efe4bf0f71d1f09dff0c6dae214c66f1b01f8d2733a81&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/63722146.jpg?k=e7fb6eb502c404f6f8b527b9ff7a23fbc9d477900708e0b1c0ec3a9ce0f54e90&o=&hp=1	2	250
7	Double Room	3	https://cf.bstatic.com/xdata/images/hotel/max1024x768/46518746.jpg?k=3c48b9cb79414ec7a6b8e04a6b9cc0e9c7f5d05b436e9af315293f7572b5d37f&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/69882886.jpg?k=a081a97151238df8524c249fa1887298dd0fbb9369d77f0607e6b768299b5afa&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/115823954.jpg?k=1bff7e16228635c38e79d5d389b2425fcc343db7fb524020d12d91275b258f1f&o=&hp=1	2	176
13	Queen Room	1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/72107080.jpg?k=1bb54fd99be10aeab829ddcf48f8f1a0dec3cae24a39d6d9da332c4fcef0dc5f&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/72107084.jpg?k=ebde35878fc1d8d29e5fd754b7d0d63db98db711cee65d6efa72a747e7c37ceb&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/92881583.jpg?k=b41279d9b08b3b38c76cc347c13b0fb85da58ab3b533a865e7e21b2b5361f439&o=&hp=1	2	160
3	Stanza Doppia	5	https://cf.bstatic.com/xdata/images/hotel/max1024x768/181681997.jpg?k=d6b74f6875010d235310a4f6b5fc058890097dc1d1aeafca432aeea445d54a37&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/181678987.jpg?k=af80a40c32a518508d5d5c24a16ef5b25fc24b4d90d9cb5d1c1265e70cc04bba&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/181661849.jpg?k=df6d5705f770928cc0cb3555410154707aced94ecd852ab24a2363a8e0cfa0db&o=&hp=1	2	190
9	Double Room	2	https://cf.bstatic.com/xdata/images/hotel/max1024x768/382857325.jpg?k=c0bfcfcff29100b84bc29e346b4e7fb76d4ce48cc26dc242983df216e6ee4914&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/382857255.jpg?k=3f5477240fd3b227a5eb38f027a48939feca96759d2668df7fc74ee6881dcf4d&o=&hp=1	https://cf.bstatic.com/xdata/images/hotel/max1024x768/109634219.jpg?k=c553c17a9b912bcbe3e458511792ec8a4d215b64b30bae976b1b2c04433e32a2&o=&hp=1	2	100
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, user_name, email, user_password) FROM stdin;
1	name	name@gmail.com	12345
2	bubu	abc@gmail.com	password
11	simo_ghilo	simoneghilotti@gmail.com	$2a$10$jMkc97oIgyKbbOtUp7EfRekTThEyhQclWdNUtN.T2lgROj8pcyY7S
12	kyle_ghilo	kyleghilotti@gmail.com	$2a$10$SGEA5m8LIByinQ6jsHoYqe.QREkGxkRYRhg9B0CkgjdxHwPZWFa4q
\.


--
-- Name: bookings_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_booking_id_seq', 1, false);


--
-- Name: hotels_hotel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotels_hotel_id_seq', 8, true);


--
-- Name: locations_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_location_id_seq', 8, true);


--
-- Name: rooms_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooms_room_id_seq', 13, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 12, true);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (booking_id);


--
-- Name: hotels hotels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT hotels_pkey PRIMARY KEY (hotel_id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (location_id);


--
-- Name: locations pk_location_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT pk_location_name UNIQUE (location_name);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (room_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: rooms fk_hotel_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT fk_hotel_id FOREIGN KEY (hotel_id) REFERENCES public.hotels(hotel_id);


--
-- Name: bookings fk_hotel_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT fk_hotel_id FOREIGN KEY (hotel_id) REFERENCES public.hotels(hotel_id);


--
-- Name: hotels fk_location_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES public.locations(location_id);


--
-- Name: bookings fk_room_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT fk_room_id FOREIGN KEY (room_id) REFERENCES public.rooms(room_id);


--
-- Name: bookings fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

