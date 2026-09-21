import { withVersion } from "../utils/imageLoader";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");
const SERIES_THUMBNAIL_BASE = "https://talentsuite.career141.com/images/seriesSection";

// Default fallback video URL
export const DEFAULT_EPISODE_VIDEO_URL =
  "https://media.career141.com/new%20reels/Mr.%20Patrick/Mr.%20Patrick.mp4";

export interface SeriesEpisode {
  id: number;
  name: string;
  role: string;
  company: string;
  duration: string;
  videoId?: string;
  videoUrl?: string;
  reels?: string[];
  bannerImage: string;
  thumbnail: string;
}

export type Episode = SeriesEpisode;

export const seriesEpisodesData: SeriesEpisode[] = [
  {
    id: 1,
    name: "Mr. Patrick Pereira",
    role: "Vice President Learning & Development",
    company: "Aitken Spence Hotels",
    duration: "04:46",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Patrick/Mr.%20Patrick.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Mr.%20Patrick/01%20Reel%20Mr.%20Patrick.mp4",
      "https://media.career141.com/new%20reels/Mr.%20Patrick/02%20Reel%20Mr.%20Patrick.mp4",
    ],
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker1.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-01.webp`,
  },
  {
    id: 2,
    name: "Mr. Ken Vijayakumar",
    role: "Senior General Manager, Human Resource & Sustainability",
    company: "A. Baur & Co. (Pvt) Ltd",
    duration: "04:18",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Ken/Mr.%20Ken.mp4",
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker2.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-02.webp`,
  },
  {
    id: 3,
    name: "Mr. Chamila C Perera",
    role: "Former Managing Director, Head of Human Resources",
    company: "HSBC Malaysia",
    duration: "03:57",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Chamila%20C%20Perera/Mr.%20Chamila%20C%20Perera.mp4",
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker3.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-03.webp`,
  },
  {
    id: 4,
    name: "Ms. Thrimuthi Dhanushka",
    role: "Group Deputy General Manager, Human Resource & Administration",
    company: "Ideal Group",
    duration: "04:13",
    videoUrl: "https://media.career141.com/new%20reels/Ms.Thrimuthi/Ms.Thrimuthi.mp4",
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker4.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-04.webp`,
  },
  {
    id: 5,
    name: "Ms. Surani Amarasinghe",
    role: "Director, Country People Partnering, Sri\u00A0Lanka",
    company: "LSEG (London Stock Exchange Group)",
    duration: "03:10",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Surani/Ms.%20Surani.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Ms.%20Surani/01%20Reel%20Ms.%20Surani.mp4",
      "https://media.career141.com/new%20reels/Ms.%20Surani/02%20Reel%20Ms.%20Surani.mp4",
    ],
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker5.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-05.webp`,
  },
  {
    id: 6,
    name: "Mr. Arshaq Farally",
    role: "Chief People Officer, Sri\u00A0Lanka",
    company: "Daraz",
    duration: "05:13",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Arshaq/Mr.%20ArshaqF.mp4",
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker6.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-06.webp`,
  },
  {
    id: 7,
    name: "Mr. Danushka Seneth",
    role: "Head of Human Resources / AGM",
    company: "Janashakthi Insurance PLC",
    duration: "03:47",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Danushaka/Mr.%20Danushaka.mp4",
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker7.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-07.webp`,
  },
  {
    id: 8,
    name: "Ms. Hasanthi De Saram",
    role: "Director / Senior HR Consultant",
    company: "(Former Director HR - Asiri Health)",
    duration: "06:55",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Hasanthi/Ms.%20Hasanthi.mp4",
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker8.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-08.webp`,
  },
  {
    id: 9,
    name: "Mr. Ashan Ransilige",
    role: "Chief Executive Officer",
    company: "Link Natural Products (Pvt.) Ltd",
    duration: "08:56",
    videoUrl: "https://media.career141.com/new%20reels/Mr%20Ashan/Mr%20Ashan.mp4",
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker9.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-09.webp`,
  },
  {
    id: 10,
    name: "Mr. Indika Ranathunga",
    role: "Chief Operating Officer",
    company: "Allied Commercial Fertilizers",
    duration: "06:03",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Indika/Mr.%20Indika.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Mr.%20Indika/Reel%201%20Mr.%20Indika.mp4",
      "https://media.career141.com/new%20reels/Mr.%20Indika/Reel%202%20Mr.%20Indika.mp4",
    ],
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker10.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-10.webp`,
  },
  {
    id: 11,
    name: "Ms. Chamindra Perera",
    role: "Human Resources Director",
    company: "GRI Sri\u00A0Lanka",
    duration: "05:11",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Chamindra/Ms.%20Chamindra.mp4",
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker11.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-11.webp`,
  },
  {
    id: 12,
    name: "Ms. Chandima Bambarenda",
    role: "Group Head of Human Resources",
    company: "Pyramid Wilmar Group",
    duration: "07:38",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Chandima/Ms.%20Chandima.mp4",
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker12.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-12.webp`,
  },
  {
    id: 13,
    name: "Mr. Gehan Samuel",
    role: "Manager of Human Resources Development",
    company: "MAS Holdings Silueta",
    duration: "03:44",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Gehan/Mr.%20Gehan.mp4",
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker13.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-13.webp`,
  },
  {
    id: 14,
    name: "Mr. Kanishka Munasinghe",
    role: "General Manager, Human Resources",
    company: "Port City BPO",
    duration: "07:23",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Kanishka/Mr.%20Kanishka.mp4",
    bannerImage: withVersion(`${R2_MEDIA_URL}/images/speaker14.png`),
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-14.webp`,
  },
];

export const episodesData = seriesEpisodesData;
export default seriesEpisodesData;
