import { HeroAutomation } from "@/components/hero-portfolio";
import { ProjectsSection } from "@/components/projects-section";
import { PhotoGallery } from "@/components/ui/gallery";
import { ContactFooter } from "@/components/contact-footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-black w-full overflow-hidden">
      <HeroAutomation />
      
      {/* Adicionamos o id="projetos" aqui */}
      <div id="projetos">
        <ProjectsSection />
      </div>
      
      <PhotoGallery />
      
      {/* Adicionamos o id="contato" aqui */}
      <div id="contato">
        <ContactFooter />
      </div>
    </main>
  );
};

export default Index;