import main from '../views/pages/main';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': main, // default page
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
