import { createGlobalState } from 'react-hooks-global-state';

const { getGlobalState, setGlobalState, useGlobalState } = createGlobalState({ activeSection: null });

const sections = new Map();
const options = {
  threshold: [ ...Array(101).keys() ].map(x => x / 100),
};

let observer;

if (typeof window !== 'undefined') {
  observer = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      sections.get(entry.target.id).threshold = entry.intersectionRatio;
    });

    let biggest = { threshold: 0 };
    sections.forEach(section => {
      if (biggest.threshold < 1 && section.threshold > biggest.threshold) {
        biggest = section;
      }
    });

    const activeSection = getGlobalState('activeSection');
    if (biggest.target && activeSection !== biggest) {
      setGlobalState('activeSection', biggest);
    }
  }, options);
}

const unregister = id => {
  if (observer && id) {
    const existing = sections.get(id);
    if (existing) {
      observer.unobserve(existing.target);
      sections.delete(id);
    }
  }
};

const register = (id, section) => {
  if (observer && id && section) {
    const existing = sections.get(id);
    if (existing && section !== existing.target) {
      unregister(id);
    }

    if (!sections.has(id)) {
      sections.set(id, {
        target: section,
        threshold: 0,
      });

      observer.observe(section);
    }
  }
};

const useActiveSection = () => {
  const [ activeSection ] = useGlobalState('activeSection');

  return {
    activeSection: activeSection?.target.id,
    register,
    unregister,
  };
};

export default useActiveSection;
