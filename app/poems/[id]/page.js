import Poem from "@components/Poem";
import Box from "@mui/material/Box";
import axios from "axios";

export async function generateMetadata({params}) {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/poem/${params.id}`);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
    title: data.title,
    discription: data.body.slice(0, 30),
    openGraph: {
      image: data.image,
      title: data.title,
      discription: data.body.slice(0, 30),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@esobeisaac',
      image: data.image,
      title: data.title,
      discription: data.body.slice(0, 30),
    }
  }
}

async function Page({params}) {

  const poemId = params.id;

  const result = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/poem/${poemId}`);
  const poem = result.data

  


  // const [poem, setPoem] = useState(null)


  return (
    <Box>
      {
        poem && <Poem poem={poem}/>
      }
    </Box>
  );
}

export default Page;
