import { createContext, useState, useContext, useEffect } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return user?.result?._id || user?.result?.googleId || "guest";
  };

  const [course, setCourse] = useState(() => {
    const userId = getUserId();
    const saved = localStorage.getItem(`course_${userId}`);
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = getUserId();
    if (course) {
      localStorage.setItem(`course_${userId}`, JSON.stringify(course));
    }
  }, [course]);

  const updateCourse = (newCourse) => setCourse(newCourse);
  
  const clearCourse = () => {
    setCourse(null); };

  return (
    <CourseContext.Provider value={{ course, updateCourse, clearCourse, loading, setLoading }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);