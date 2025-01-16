import { SingleCourseContent } from '@comp/single-course';
import { useGetCourse } from '@openapi/queries';
import { lazy } from 'react';
import { Loading } from 'react-daisyui';
import { useParams } from 'react-router-dom';

const ErrorPage = lazy(() => import('@scr/error'));

export function Component() {
  const queryParam = useParams();
  const { error, data, isPending } = useGetCourse({
    path: {
      courseId: queryParam.courseId!,
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return <SingleCourseContent data={data!} />;
}
