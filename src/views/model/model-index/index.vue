<template>
  <div>
    <div class="select-project">
      <el-select v-model="projectName" placeholder="请选择项目">
        <el-option
          v-for="item in authorizations"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" @click="loadModel">加载模型数据</el-button>
    </div>
    <div class="show-message">
      <!-- project logo -->
      <img :src="projectLogo" class="project-logo">

      <div class="project-img">
        <img :src="projectImg" class="project-img-01">
      </div>
      <div class="project-desc">
        {{showMessage}}
      </div>
    </div>
    <div id="project-model">
      <!-- project Model -->
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import * as Three from 'three';
  export default {
    data() {
      return {
        authorizations: [  // 权限下所有的项目名字
        ],
        projectName: '',  // 项目名字
        showMessage: '',  // 项目描述
        projectLogo: '',  // 项目 logo
        projectImg: '',  // 项目图片
        camera: null,
        scene: null,
        renderer: null,
        mesh: null
      };
    },
    created() {
      this.authorizations = JSON.parse(this.$common.getLocal('projects'));
    },
    mounted() { // 页面渲染之后
      console.log('auths', this.authorizations);
      if (this.projectName === '') {
        let username = this.$common.getLocal('username');
        this.showMessage = '欢迎您，' + username + '!请选择项目查看';
      }
    },
    watch: {
      projectName: function (newVal, oldVal) { // 切换项目显示不同
        console.log('watch value:', newVal + ' ' + oldVal);
        if (newVal === '') {
          console.log('请选择项目');
          return;
        }
        // 根据项目查询信息
        this.$http({
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          url: '/api/project/message',
          params: {
            projectName: newVal
          }
        }).then((res) => {
          console.log('searchPro res:', res);
          if (res && res.code === 200) {
            // 查询成功 项目相关信息
            // 模型数据清空
            document.getElementById('project-model').innerHTML = '';
            let projectModel = res.obj;
            console.log('project', projectModel);
            this.showMessage = projectModel.introduction;
            this.projectLogo = 'src/assets/images/project/' + projectModel.logoName;
            this.projectImg = 'src/assets/images/project/' + projectModel.imgName;
          } else {
            this.showMessage = res.message;
            this.projectLogo = '';
            this.projectImg = '';
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    methods: {
      loadModel: function () {
        let proj = this.projectName;
        if (proj === '') {
          this.$message('请先选择项目');
          return;
        }
        // 切换数据源
        this.$http({
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          url: '/api/project/switch',
          params: {
            projectName: proj
          }
        }).then((res) => {
          console.log('switch pro res:', res);
          if (res && res.code === 200) {
            // 切换成功
            this.$message('功能尚在开发ing...');
            this.projectImg = '';
            this.showMessage = '';
            document.getElementById('project-model').innerHTML = '';
            this.init();
            this.animate();
          } else {
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      init: function() {
        let container = document.getElementById('project-model');

        this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);
        this.camera.position.z = 1;

        this.scene = new Three.Scene();

        let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
        let material = new Three.MeshNormalMaterial();

        this.mesh = new Three.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.renderer = new Three.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);
      },
      animate: function() {
        requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
      }
    }
  };
</script>
<style>
  .select-project {
    float: right;
  }
  .show-message {
    width: 100%;
  }
  .show-message .project-img {
    text-align: center;
  }
  .show-message .project-img .project-img-01{
    width: 65%;
    height: auto;
  }
  .show-message .project-desc {
    text-align: center;
  }
  #project-model {
    height: 500px;
  }
</style>
