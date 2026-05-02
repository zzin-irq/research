/* Placeholder exports so route lazy-loads resolve during scaffold.
 * Replace each with a real page module. */
import { Helmet } from 'react-helmet-async';

function Placeholder({ title }: { title: string }) {
  return (
    <>
      <Helmet>
        <title>{title} · IPISH</title>
      </Helmet>
      <div className="max-w-prose mx-auto px-4 py-16">
        <h1 className="font-serif text-3xl md:text-4xl">{title}</h1>
        <p className="mt-4 text-text-muted">This page is part of the scaffold and is not yet implemented.</p>
      </div>
    </>
  );
}

export const ResearchIndex = () => <Placeholder title="Research" />;
export const ResearchDetail = () => <Placeholder title="Research detail" />;
export const People = () => <Placeholder title="People" />;
export const PersonDetail = () => <Placeholder title="Person" />;
export const Topics = () => <Placeholder title="Topics" />;
export const Events = () => <Placeholder title="Events" />;
export const About = () => <Placeholder title="About" />;
export const Contact = () => <Placeholder title="Contact" />;
export const NotFound = () => <Placeholder title="Not found" />;
