<template>
  <div id="example">
    <table id="firstTable">
      <thead>
        <tr>
          <th><a href="#" v-on:click="sortByAlbumID">ID</a></th>
          <th><a href="#" v-on:click="sortByAlbumTitle">Album Title</a></th>
          <th><a href="#" v-on:click="sortByPhotoTitle">Photo Titles</a></th>
          <th>Thumbnail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="album in tableAlbums" :key="album.id">
          <td>{{album.id}}</td>
          <td>{{album.title}}</td>
          <td>
            <ul class="photos">
              <li v-for="photo in album.photos" :key="photo">
                {{photo}}
              </li>
            </ul>
          </td>
          <img :src="album.thumbnail" />
        </tr>
      </tbody>
    </table>
    <button v-on:click="previousPage">Previous Page</button>
    <button v-on:click="nextPage">Next Page</button>
  </div>
</template>

<script>
import axios from 'axios';
const PAGE_SIZE = 25;
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      albums: [],
      photos: [],
      page: 0,
      tableAlbums: [],
      loading: false,
      error: undefined,
      albumIDSort: 'asc',
      albumTitleSort: 'asc',
      photoTitleSort: 'asc'
    };
  },
  mounted: function() {
    this.loading = true;

    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then(res => {
        this.albums = res.data;
      })
      .catch(err => {
        this.loading = false;
        this.error = err;
      });

    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then(res => {
        this.photos = res.data;
        let albums = this.albums;
        let photos = this.photos;

        this.albums = albums.map(function(album) {
          let albumPhotos = photos.filter((photo) => album.id  === photo.albumId);
          album.photos = albumPhotos.map((albumPhoto) => albumPhoto.title).slice(0, 3);
          album.thumbnail = albumPhotos[0].thumbnailUrl;
          return (album);
        });

        this.tableAlbums = this.albums.slice(0, PAGE_SIZE);
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        this.error = err;
      });
  },
  methods: {
    nextPage: function () {
      let nextPage = this.page + 1;

      let startingIndex = PAGE_SIZE * nextPage;
      let endingIndex = startingIndex + PAGE_SIZE;

      if(startingIndex < this.albums.length) {
        this.tableAlbums = this.albums.slice(startingIndex, endingIndex);
        this.page = nextPage;
      }
    },
    previousPage: function() {
      let previousPage = this.page - 1;

      if(previousPage >= 0) {
        let startingIndex = PAGE_SIZE * previousPage;
        let endingIndex = startingIndex + PAGE_SIZE;
        this.tableAlbums = this.albums.slice(startingIndex, endingIndex);
        this.page = previousPage;
      }
    },
    sortByAlbumID: function() {
      if(this.albumIDSort === 'asc') {
        this.albums = this.albums.sort((a, b) => (a.id > b.id) ? -1 : 1);
        this.albumIDSort = 'desc';
        this.tableAlbums = this.albums.slice(0, PAGE_SIZE);
      } else {
        this.albums = this.albums.sort((a, b) => (a.id > b.id) ? 1 : -1);
        this.albumIDSort = 'asc';
        this.tableAlbums = this.albums.slice(0, PAGE_SIZE);
      }
    },
    sortByAlbumTitle: function() {
      if(this.albumTitleSort === 'asc') {
        this.albums = this.albums.sort((a, b) => (a.title > b.title) ? -1 : 1);
        this.albumTitleSort = 'desc';
        this.tableAlbums = this.albums.slice(0, PAGE_SIZE);
      } else {
        this.albums = this.albums.sort((a, b) => (a.title > b.title) ? 1 : -1);
        this.albumTitleSort = 'asc';
        this.tableAlbums = this.albums.slice(0, PAGE_SIZE);
      }
    },
    sortByPhotoTitle: function() {
      if(this.photoTitleSort === 'asc') {
        this.albums = this.albums.sort((a, b) => (a.photos[0] > b.photos[0]) ? -1 : 1);
        this.photoTitleSort = 'desc';
        this.tableAlbums = this.albums.slice(0, PAGE_SIZE);
      } else {
        this.albums = this.albums.sort((a, b) => (a.photos[0] > b.photos[0]) ? 1 : -1);
        this.photoTitleSort = 'asc';
        this.tableAlbums = this.albums.slice(0, PAGE_SIZE);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
