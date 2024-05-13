import React, { useState, useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

const AddBlog = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const { user } = useContext(AuthContext);

  const handleEditorChange = (content, editor) => {
    setContent(content);
    console.log("Content was updated:", content);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Title:", title);
    console.log("Summary:", summary);
    console.log("Content:", content);
    console.log("Images:", images);
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU3VqdSIsImp0aSI6IjExMWQxMWJmLTAzNTctNDU2Mi1iM2YwLTYxMTVhZGYyYjg5NSIsInVzZXJJZCI6ImIyNWFjYWZlLWFhZGItNGNlMS05YTk3LTQwZjQxZTk0NGYzZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3MTU2OTQ1NTksImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjUwNzkiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDc5In0.M80Sta3pFWDtXNqFTW9q9JM9wbijPEmcg4LfQ36Cpyg";

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    console.log("Tags:", tagsArray);

    try {
      // Make Axios POST request
      console.log("Making POST request to create a blog post...");
      const response = await axios.post(
        "http://localhost:5079/api/blog/create",
        {
          title: title,
          summary: summary,
          content: content,
          image: images ? images[0] || "" : "",
          tags: tagsArray,
          author: "b25acafe-aadb-4ce1-9a97-40f41e944f3e",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post request response:", response.data);

      // Clear form fields after successful submission
      setTitle("");
      setContent("");
      setImages([]);
      setTags("");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log(
          "Server responded with error status:",
          error.response.status
        );
        console.log("Error response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received from server:", error.request);
        console.log("Error message:", error.message);
        console.log("Error:", error);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error setting up request:", error);
      }
    }
  };

  const handleImageUpload = async (blobInfo) => {
    const formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());
    formData.append("upload_preset", "bloggit");

    if (blobInfo.blob().size > 3 * 1024 * 1024) {
      throw new Error("File size exceeds the limit of 3MB.");
    }

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqxfn5mdd/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      console.log("Cloudinary API Response:", result);

      if (result && result.url) {
        console.log("Image upload successful");
        setImages((prevImages) => [...prevImages, result.url]);
        return result.url;
      } else {
        console.error("Image upload failed:", result);
        throw new Error("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center">
      {/* Right Column: User Posts and Comments */}
      <div className="w-full lg:w-3/4 p-4 bg-white rounded-lg shadow-md">
        {/* User Posts */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Add a Blog Post
          </h1>
        </div>
        <div className="mb-8">
          <div className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block font-medium text-gray-700 mb-1"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                className="border-b-2 border-gray-300 focus:outline-none mb-6 w-full p-2 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="tags"
                className="block font-medium text-gray-700 mb-1"
              >
                Tags:
              </label>
              <input
                type="text"
                id="tags"
                placeholder="Tags (e.g. tag1, tag2, tag3)"
                className="border-b-2 border-gray-300 focus:outline-none mb-6 w-full p-2 rounded-md"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="summary"
                className="block font-medium text-gray-700 mb-1"
              >
                Summary:
              </label>
              <textarea
                id="summary"
                rows="4"
                placeholder="Summary"
                className="border-2 border-gray-300 focus:outline-none mb-6 w-full p-2 resize-none rounded-md"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                style={{ resize: "none" }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block font-medium text-gray-700 mb-1"
              >
                Content:
              </label>
              <Editor
                apiKey="jz18miwaiqf2sofxkp6lo4ezvfs8ne7owwbev2753gerf1gj"
                initialValue=""
                init={{
                  height: "60vh",
                  menubar: false,
                  selector: "textarea#full-featured",
                  plugins:
                    "preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect typography advtemplate",
                  toolbar:
                    "undo redo | revisionhistory | aidialog aishortcuts | blocks fontsizeinput | bold italic | align numlist bullist | link image | table media pageembed | lineheight  outdent indent | strikethrough forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen preview | pagebreak anchor codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck",
                  automatic_uploads: true,
                  file_picker_types: "image",
                  images_upload_url:
                    "https://api.cloudinary.com/v1_1/dqxfn5mdd/image/upload",
                  images_upload_handler: handleImageUpload,
                }}
                onEditorChange={handleEditorChange}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none float-end"
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
