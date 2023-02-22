import { Divider } from '@mui/material';
import AppTitle from '../components/AppTitle';
import { AboutHero, AboutWhat, AboutTeam, AboutVision, AboutTestimonials } from '../sections/about';

export default function AboutPage() {
  return (
    <>
      <AppTitle title="About Us" />

      <AboutHero />

      <AboutWhat />

      <AboutVision />

      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

      <AboutTeam />

      <AboutTestimonials />
    </>
  );
}
