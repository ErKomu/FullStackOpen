import './App.css';

interface HeaderProps {
  name: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  courseParts: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part, index) => (
        <div key={index}>
          {renderCoursePart(part)}
        </div>
      ))}
    </div>
  );
};

const renderCoursePart = (part: CoursePart) => {
  switch (part.kind) {
    case "basic":
      return (
        <div className="course-part">
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p><em>{part.description}</em></p>
        </div>
      )
    case "group":
      return (
        <div className="course-part">
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p>project exercises {(part as CoursePartGroup).groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div className="course-part">
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p><em>{part.description}</em></p>
          <p>submit to {(part as CoursePartBackground).backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div className="course-part">
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p><em>{part.description}</em></p>
          <p>required skils: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return null;
  }
};


const Total = (props: TotalProps) => {
  const totalExercises = props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return (
    <p>
      Number of exercises {totalExercises}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
