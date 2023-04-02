import { Box, Container } from '@mui/material';
import Typography from "@mui/material/Typography";

function AboutUs() {
    return (
      <Container maxWidth="md" sx={{
        m:'auto',
        p:8
      }}>
        <Box 
        sx={{
            m:'auto',
            my:2,
            p:2,
            borderRadius:'19px',
            color:"#0B2447",
            align:'center',
            maxWidth:'md',
  
        }}>
          <Typography variant="h5" align="center" 
          sx={{
            fontWeight:'bold'
          }}
          gutterBottom>
            About Us
          </Typography>

          <Box sx={{
            backgroundColor:"#A5D7E8",p:4,
            borderRadius:'19px',
          }}
          >
            
          <Typography variant="body1" align="justify" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, ante id suscipit bibendum, enim risus placerat risus, nec blandit nisi velit vitae turpis.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Proin egestas elit ut elit convallis lacinia. Morbi id augue feugiat, convallis ex ut, faucibus tortor. Vivamus ullamcorper nisi ac velit blandit, vitae consequat turpis sollicitudin.
          </Typography>
          </Box>
        </Box>

        <Box sx={{
            m:'auto',
            my:1,
            p:2,
            borderRadius:'19px',
            color:"#0B2447",
            align:'end',
            maxWidth:'md',

        }} >
          <Typography variant="h5"  align="center"   sx={{
            fontWeight:'bold'
          }} gutterBottom>
            Contact Us
          </Typography>
          <Box sx={{
            backgroundColor:"#A5D7E8",p:4,
            borderRadius:'19px',
          }}
          >

          <Typography variant="body1" align="justify" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, ante id suscipit bibendum, enim risus placerat risus, nec blandit nisi velit vitae turpis. Praesent at ipsum vel velit malesuada scelerisque. Aenean viverra ultricies ipsum,
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Proin egestas elit ut elit convallis lacinia. Morbi id augue feugiat, convallis ex ut, faucibus tortor. Vivamus ullamcorper nisi ac velit blandit, vitae consequat turpis sollicitudin. Nam imperdiet dui ut tortor vestibulum, vitae rutrum nisi pretium.
          </Typography>
          </Box>
        </Box>

        <Box sx={{
            m:'auto',
            my:1,
            p:2,
            borderRadius:'19px',
            maxWidth:'md',

        }}>
          <Typography variant="h5" align="center"   sx={{
            fontWeight:'bold'
          }} gutterBottom>
            Support
          </Typography>
          <Box sx={{
            backgroundColor:"#A5D7E8",p:4,
            borderRadius:'19px',
          }}
          >

          <Typography variant="body1" align="justify" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, ante id suscipit bibendum, enim risus placerat risus, nec blandit nisi velit vitae turpis. Praesent at ipsum vel velit malesuada scelerisque.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Proin egestas elit ut elit convallis lacinia. Morbi id augue feugiat, convallis ex ut, faucibus tortor. Vivamus ullamcorper nisi ac velit blandit, vitae consequat turpis sollicitudin.
          </Typography>
          </Box>
        </Box>
      </Container>
    );
  }
  
  export default AboutUs;

  
  
  
  
  