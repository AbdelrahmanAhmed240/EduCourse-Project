import { createContext, useState, useContext, useEffect } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState(() => {
    const saved = localStorage.getItem("eduforge_course");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course) {
      localStorage.setItem("eduforge_course", JSON.stringify(course));
    }
  }, [course]);

  const updateCourse = (newCourse) => setCourse(newCourse);
  
  const clearCourse = () => {
    setCourse(null);
    localStorage.removeItem("eduforge_course");
  };

  return (
    <CourseContext.Provider value={{ course, updateCourse, clearCourse, loading, setLoading }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);