
import './Aboutus.css'
import  {AiFillMail , AiFillPhone , AiFillGithub}  from "react-icons/ai";

const AboutUs = () => {
  return (
    <div className="about-us-container">



      <header className='headAbout'>
        <h2 className='Abouth2'>About Us</h2>
      </header>
      
      <main className='mainComp'>
        <section className='about-section'>
          <h2 className='Abouth2'>Our Mission</h2>
          <p className='AboutP'>We are here to cut the distance between a farmer and the retailer , by the means of improved delivery system offered by ezDelivery.
          Our aim is to provide Fast and Easy delivery solutions along with keeping the middle-men away from the scene .
          </p>
        </section>
        
        <section>
          <h2 className='Abouth2'>Our Team</h2>
          <ul className='AboutUl'>
            <li>AMAN - <a className='github' href="https://github.com/amanscisingh" target='__blank'><AiFillGithub/></a></li>
            <li>ANSHUL - <a className='github' href="https://github.com/anshul7409" target='__blank'><AiFillGithub/></a></li>
            <li>ARTH - <a className='github' href="https://github.com/probablyArth" target='__blank'><AiFillGithub/></a> </li>
            <li>KUNAL - <a className='github' href="https://github.com/Kunal0220" target='__blank'><AiFillGithub/></a></li>
            <li>VAIBHAV - <a className='github' href="https://github.com/VaibhavKambar7" target='__blank'><AiFillGithub/></a></li>
          </ul>
        </section>

        <section className='about-section'>
          <h2 className='Abouth2'>Contact Us</h2>
          <p className='AboutP AboutP2'> <AiFillMail/> : <a className='AboutP2' href=" contact@ezDeliver.co" target='__blank'> contact@ezDeliver.co</a></p>
          <p className='AboutP AboutP2'> <AiFillPhone/> : +91 77766 22233</p>
        </section>


      </main>
      

    </div>
  );
};

export default AboutUs;
