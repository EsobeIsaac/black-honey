import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, ImageList, ImageListItem, ImageListItemBar, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";
import DemoImg from '@public/images/literature.jpg';
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import Link from "next/link";






function PoemSlides({data, title}) {
    var settings = {
        className: "slick-poem slider",
        autoplay: true,
        pauseOnHover: true,
        infinite: data.poems.length > 3,
        dots: false,
        speed: 500,
        slidesToShow: 4,
        centerMode: false,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: data.poems.length > 2,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: data.poems.length > 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          }
        ]
      };

    
      return (
        <Box py={10}>
            {/* <ImageList cols={4} gap={5}> */}
            <Container>
            <Typography variant="h4" mb={6} color={'primary.main'}>{title}</Typography>
            {
              data.loading ? <Loading/> : (
                <Slider {...settings}>            
                  {
                    data.poems && data.poems[0] ? data.poems.map((item, index) => {
                      return <Box key={index}>
                        <Card sx={{margin: '0px 5px'}}>
                        <CardMedia component='img' sx={{height: 250}} alt='image' image={item.image}/>
                        <CardContent>
                            <Typography variant='subtitle1'>{item.title}</Typography>
                        </CardContent>
                        <CardActions >
                          <Link href={`/poems/${item._id}`} style={{width: '100%'}}>
                            <Button variant='contained' color={'primary'} size='small' fullWidth>Read</Button>
                          </Link>
                        </CardActions>
                      </Card>  
                    </Box>
                    }) : null
                  }             
                </Slider>
              )
            }
            <Button color="secondary" sx={{position: 'relative', top: '20px', right: 'calc(-100% + 100px)'}}>See More</Button>
            </Container>
      {/* </ImageList> */}
        </Box>
      );
}

export default PoemSlides;
