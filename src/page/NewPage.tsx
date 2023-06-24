import { FC, useState, useEffect } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface NewsProps {
  data: Post;
}

const NewsComponent: FC<NewsProps> = ({ data }) => {
  return (
    <div key={data.id} className="rounded-md shadow-md p-4">
      <div className="text-3xl">{data.title}</div>
      <div className="text-sm py-4">{data.body}</div>
    </div>
  );
};

const NewsPage: FC = () => {
  // state
  useEffect(() => {
    loadNewsAsync();
  }, []);
  const [posts, setPosts] = useState<Post[]>
  ([
    {
      userId: 1,
      id: 1,
      title: "test",
      body: "test",
    },
  ]);

  // async function (Promise)
  const loadNews = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((resp) => resp.json())
      .then((json) => {
        setPosts(json);
      });
  };

  // async await function
  
  const loadNewsAsync = async () => {
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
      const json = await resp.json();
      setPosts(json);
    } catch (e) {
      // show error
    }
  };

  // template
  return (
    <>
    
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {posts.map((value) => (
          <NewsComponent data={value} />
        ))}
      </div>
    </>
  );
};

export { NewsPage };
