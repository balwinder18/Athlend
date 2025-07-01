
import Navbar from '../components/Navbar'
import Locationdetect from '../components/Locationdetect';
import Bodycontent from '../components/home/Bodycontent'
import Allgrounds from '../components/home/Allgrounds'
import Help from '../components/Help'
import Head from "next/head";

export default function Home() {
 

  return (
    <>
    <Head>
        <title>Athlend: making gorunds search easier</title>
        <meta
          name="description"
          content="Find you best sports ground nearby."
        />
</Head>
    
      <Navbar/>
      {/* <Bodycontent/> */}
      <Allgrounds/>
      <Help/>
      
     
     {/* <Locationdetect/> */}
     
    </>
  );
}
