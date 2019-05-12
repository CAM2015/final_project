import { Component} from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: 'blog.page.html',
  styleUrls: ['blog.page.scss']
})
export class BlogPage {
  text = '';
  posts: any[] = [];
  pageSize = 10;
  cursor: any;
  infiniteEvent: any;
  image: string;

  constructor() {}

  getPosts() {}

  updateToken() {}

  loadMorePosts(event) {}

  refresh(event) {}

  post() {}

  ago(time) {}

  addPhoto() {}

  launchCamera() {}

  upload(name: string) {}

  like(post) {}

  comment(post) {}


  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
