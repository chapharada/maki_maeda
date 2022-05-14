export default {
  //urlのファイル名だけを取得する
  outputLog(data , paramator) {
    if(data.isArray){
      for (var el of data) {
        var para = paramator;
        var element = el.para
        var detailUrlArray = element.split("/");
        var detailCaptionData = detailUrlArray.pop();
        paramator = detailCaptionData;
      }
    }else{
      var urlArray = this.article.cover.url.split("/");
      var captionData = urlArray.pop();
      this.article.cover.url = captionData;
    }
  }
}