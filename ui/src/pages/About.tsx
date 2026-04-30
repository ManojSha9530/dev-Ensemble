
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background/80 to-primary/10 px-4 py-12">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-black tracking-tighter mb-6 text-foreground drop-shadow-sm">
          Ensemble: Orchestrating Intelligent Workflows
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Empowering your team with AI-driven agents to automate complex tasks, streamline operations, and unlock new levels of productivity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            title="Intelligent Agents"
            description="Leverage a fleet of specialized AI agents, from code generation to market analysis, all managed seamlessly."
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-8 w-8 text-primary"><path d="M12 10a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V12a2 2 0 0 0-2-2Z"></path><path d="M7.9 7.9a3.5 3.5 0 0 1 4.2-4.2C13.6 4 14 5.1 14 6.6c0 1.4-.5 2.4-1.7 3.5a3.5 3.5 0 0 1-4.2 4.2C9.5 14 10 13 10 11.5c0-1.4-.5-2.4-1.1-3.5Z"></path><path d="M16.7 16.7a3.5 3.5 0 0 1-4.2 4.2C9.5 20 10 19 10 17.5c0-1.4-.5-2.4-1.7-3.5a3.5 3.5 0 0 1 4.2-4.2c1.3 1.1 1.7 2.2 1.7 3.7Z"></path></svg>}
          />
          <FeatureCard
            title="Automated Workflows"
            description="Design, deploy, and monitor complex multi-agent workflows to automate your business processes."
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-8 w-8 text-primary"><path d="M22 12h-4l-3 3L9 3l-3 3H2"></path><path d="M5.9 18.4a2.6 2.6 0 0 0 0 3.6l-2.2 2.2a2.6 2.6 0 0 0 0 3.6l2.2 2.2a2.6 2.6 0 0 0 3.6 0l2.2-2.2a2.6 2.6 0 0 0 0-3.6l-2.2-2.2a2.6 2.6 0 0 0-3.6 0Z"></path><path d="M16.7 16.7a2.6 2.6 0 0 0 0 3.6l-2.2 2.2a2.6 2.6 0 0 0 0 3.6l2.2 2.2a2.6 2.6 0 0 0 3.6 0l2.2-2.2a2.6 2.6 0 0 0 0-3.6l-2.2-2.2a2.6 2.6 0 0 0-3.6 0Z"></path></svg>}
          />
          <FeatureCard
            title="Scalable Infrastructure"
            description="Built for enterprise-grade performance and reliability, handling demanding workloads with ease."
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-8 w-8 text-primary"><path d="M6 20h12"></path><path d="M6 14h12"></path><path d="M3 4c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1v8Z"></path><path d="M10 10v4h4v-4"></path></svg>}
          />
        </div>

        <div className="mt-16 flex flex-col sm:flex-row sm:justify-center gap-6">
          <Button
            size="lg"
            variant="default"
            className="text-lg font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
            onClick={() => navigate('/auth')}
          >
            Get Started <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-transform border-white/20 bg-white/5 backdrop-blur-md"
            onClick={() => navigate('/about')}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <div className="p-6 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
    <div className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20 shadow-inner">{icon}</div>
    <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default About;
