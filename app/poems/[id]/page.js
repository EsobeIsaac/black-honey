import Poem from "@components/Poem";
import Box from "@mui/material/Box";
import axios from "axios";

export async function generateMetadata({params}) {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/poem/${params.id}`);
  return {
    title: data.title,
    discription: data.body.slice(0, 30),
    openGraph: data.image
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
