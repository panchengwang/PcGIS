import './MapControl.css'
import BackMapType from './BackMapType'
import MapKeys from './MapKeys.js'
import { v4 as uuidv4 } from 'uuid'
import $ from 'jQuery'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import { fromLonLat, toLonLat } from 'ol/proj'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM, Vector as VectorSource } from 'ol/source'
import { defaults as olDefaultControls } from 'ol/control'
import { wgs84togcj02 } from './Gcj02Utils'

window.__mapApiOK = {
  google: false,
  bing: false,
  gaode: false,
  qq: false,
  tianditu: false
}

window.__initQQMap = () => {
  console.log('__init qq map')
}

class MapControl {
  /**
   * 构造函数
   * @description 构造一个MapControl
   * @param {Object} opts 参数，如
   * {
   *  div: 'MapControl要挂载的',
   *  view: '和openlayers的view相同,具体参看openlayers文档',
   *  needGcj02Correct: '是否需要修正gcj02坐标系的偏移',
   *  backMap: '背景地图的类型'
   * }
   */
  constructor (opts) {
    const me = this
    me.opts = { ...opts }
    me.ids = {
      map: me.opts.div,
      ol: uuidv4(),
      bk: uuidv4(),
      google: uuidv4(),
      bing: uuidv4(),
      qq: uuidv4(),
      gaode: uuidv4(),
      tianditu: uuidv4()
    }
    me.needGcj02Correct = true
    if (me.opts.needGcj02Correct !== undefined) {
      me.needGcj02Correct = me.opts.needGcj02Correct
    }
    me.view = opts.view || {
      center: fromLonLat([111.30850576967045, 27.32099818500464]),
      maxZoom: 20,
      zoom: 15
    }
    me.view = new View({
      ...me.view,
      constrainResolution: true,
      enableRotation: false
    })
    me.divs = {
      map: $('#' + me.ids.map).add('fit-to-parent'),
      ol: null,
      bk: null,
      google: null,
      bing: null,
      gaode: null,
      qq: null,
      tianditu: null
    }
    me.divs.ol = $('<div>').appendTo(me.divs.map).addClass('fit-to-parent').css({ 'z-index': 2 }).attr({ id: me.ids.ol })
    me.divs.bk = $('<div>').appendTo(me.divs.map).addClass('fit-to-parent').css({ 'z-index': 1 }).attr({ id: me.ids.bk })

    me.maps = {
      osm: new TileLayer({
        source: new OSM(),
        visible: true
      }),
      google: null,
      bing: null,
      gaode: null,
      gaodelayers: [],
      qq: null,
      tianditu: null
    }

    me.draftSource = new VectorSource({})
    me.draftLayer = new VectorLayer({
      source: me.draftSource
    })
    me.maps.ol = new Map({
      target: me.ids.ol,
      layers: [
        me.maps.osm,
        me.draftLayer
      ],
      view: me.view,
      controls: olDefaultControls({
        attribution: false,
        zoom: false
      })
    })
  }

  doSomething () {
    console.log('do some thing')
  }

  setBackMap (bktype) {
    const me = this
    me.backMap = bktype
    me._hideAllBackMap()

    if (me.backMap === BackMapType.OSM) {
      me.maps.osm.setVisible(true)
    }

    if (me._isGoogle(bktype)) {
      me._setBackMapGoogle()
    }

    if (me._isGaode(bktype)) {
      me._setBackMapGaode()
    }

    if (me._isBing(bktype)) {
      me._setBackMapBing()
    }

    if (me._isQQ(bktype)) {
      me._setBackMapQQ()
    }

    if (me._isTianditu(bktype)) {
      me._setBackMapTianditu()
    }
  }

  _hideAllBackMap () {
    const me = this
    me.maps.osm.setVisible(false)
    if (me.divs.google) {
      me.divs.google.hide()
    }
    if (me.divs.bing) {
      me.divs.bing.hide()
    }
    if (me.divs.gaode) {
      me.divs.gaode.hide()
    }
    if (me.divs.qq) {
      me.divs.qq.hide()
    }
    if (me.divs.tianditu) {
      me.divs.tianditu.hide()
    }
  }

  _setBackMapTianditu () {
    const me = this
    if (window.__mapApiOK.tianditu) {
      if (me.maps.tianditu) {
        me.divs.tianditu.show()
        me._updateTiandituView()
      } else {
        me._initTiandituMap()
      }
    } else {
      me._loadTiandituMapApi()
    }
  }

  _gcj02CorrectTianditu (lonlat) {
    // lonlat = wgs84togcj02(lonlat)
    return lonlat
  }

  _updateTiandituView () {
    const me = this
    const center = me._gcj02CorrectTianditu(toLonLat(me.view.getCenter()))
    const zoom = me.view.getZoom()
    // eslint-disable-next-line no-undef
    me.maps.tianditu.centerAndZoom(new T.LngLat(center[0], center[1]), zoom)
    me.maps.tianditu.setMapType(me._getTiandituMapTypeID(me.backMap))
  }

  _initTiandituMap () {
    const me = this
    window.__mapApiOK.tianditu = true
    me.divs.tianditu = $('<div>').attr('id', me.ids.tianditu).appendTo($('#' + me.ids.bk)).addClass('fit-to-parent')
    // eslint-disable-next-line no-undef
    me.maps.tianditu = new T.Map(me.ids.tianditu, {})
    // eslint-disable-next-line no-undef
    me._updateTiandituView()
    // updateTiandituView(control)
    me.view.on('change:center', (e) => {
      me._updateTiandituView()
    })
    me.view.on('change:resolution', (e) => {
      me._updateTiandituView()
    })
  }

  _getTiandituMapTypeID (type) {
    let maptype = ''
    if (type === BackMapType.TIANDITU_HYBRID_MAP) {
      // eslint-disable-next-line no-undef
      maptype = TMAP_HYBRID_MAP
    } else if (type === BackMapType.TIANDITU_NORMAL_MAP) {
      // eslint-disable-next-line no-undef
      maptype = TMAP_NORMAL_MAP
    } else if (type === BackMapType.TIANDITU_SATELLITE_MAP) {
      // eslint-disable-next-line no-undef
      maptype = TMAP_SATELLITE_MAP
    } else if (type === BackMapType.TIANDITU_TERRAIN_HYBRID_MAP) {
      // eslint-disable-next-line no-undef
      maptype = TMAP_TERRAIN_HYBRID_MAP
    } else if (type === BackMapType.TIANDITU_TERRAIN_MAP) {
      // eslint-disable-next-line no-undef
      maptype = TMAP_TERRAIN_MAP
    }
    return maptype
  }

  _loadTiandituMapApi () {
    const me = this
    const url = 'http://api.tianditu.gov.cn/api?v=4.0&tk='
    $.getScript(url + MapKeys.tianditu, () => {
      setTimeout(() => {
        me._initTiandituMap()
      }, 300)
    })
  }

  _setBackMapQQ () {
    const me = this
    if (window.__mapApiOK.qq) {
      if (me.maps.qq) {
        me.divs.qq.show()
        me._updateQQView()
      } else {
        me._initQQMap()
      }
    } else {
      me._loadQQMapApi()
    }
  }

  _gcj02CorrectQQ (lonlat) {
    lonlat = wgs84togcj02(lonlat)
    return lonlat
  }

  _updateQQView () {
    const me = this
    if (!me._isQQ(me.backMap)) {
      return
    }
    me.maps.qq.setBaseMap({ type: 'vector' })
    switch (me.backMap) {
      case BackMapType.QQ_ROAD:
        me.maps.qq.setBaseMap({ type: 'vector' })
        break
      case BackMapType.QQ_SATELLITE:
        me.maps.qq.setBaseMap({ type: 'satellite', features: ['base'] })
        break
      case BackMapType.QQ_TRAFFIC:
        me.maps.qq.setBaseMap([
          { type: 'vector' },
          { type: 'traffic' }
        ])
        break
    }
    let center = toLonLat(me.view.getCenter())
    center = me._gcj02CorrectQQ(center)
    const zoom = me.view.getZoom()
    // eslint-disable-next-line no-undef
    me.maps.qq.setCenter(new TMap.LatLng(center[1], center[0]))
    me.maps.qq.setZoom(zoom)
  }

  _initQQMap () {
    const me = this
    window.__mapApiOK.qq = true
    me.divs.qq = $('<div>').attr('id', me.ids.qq).appendTo($('#' + me.ids.bk)).addClass('fit-to-parent').addClass('bk_qq')
    // eslint-disable-next-line no-undef
    me.maps.qq = new TMap.Map(document.getElementById(me.ids.qq), {
      basemap: {
        type: 'vector'
      }
    })
    setTimeout(() => {
      me._updateQQView()
    }, 1000)

    me.view.on('change:center', (e) => {
      me._updateQQView()
    })
    me.view.on('change:resolution', (e) => {
      me._updateQQView()
    })
  }

  _loadQQMapApi () {
    const me = this
    const url = 'https://map.qq.com/api/gljs?v=1.exp&callback=__initQQMap&key='
    $.getScript(url + MapKeys.qq, () => {
      setTimeout(() => {
        me._initQQMap()
      }, 1000)
    })
  }

  _setBackMapBing () {
    const me = this
    if (window.__mapApiOK.bing) {
      if (me.maps.bing) {
        me.divs.bing.show()
        me._updateBingView()
      } else {
        me._initBingMap()
      }
    } else {
      me._loadBingMapApi()
    }
  }

  _loadBingMapApi () {
    const me = this
    const url = 'https://www.bing.com/api/maps/mapcontrol?callback=__bingApiCallBack&key='
    $.getScript(url + MapKeys.bing, () => {
      setTimeout(() => {
        me._initBingMap()
      }, 1000)
    })
  }

  _initBingMap () {
    const me = this
    window.__mapApiOK.bing = true
    let center = toLonLat(me.view.getCenter())
    center = me._gcj02CorrectBing(center)
    const zoom = me.view.getZoom()
    const maptype = me._getBingMapTypeId(me.backMap)
    me.divs.bing = $('<div>').attr('id', me.ids.bing).appendTo($('#' + me.ids.bk)).addClass('fit-to-parent')
    // eslint-disable-next-line no-undef
    me.maps.bing = new Microsoft.Maps.Map(document.getElementById(me.ids.bing), {
      // eslint-disable-next-line no-undef
      center: new Microsoft.Maps.Location(center[1], center[0]),
      // eslint-disable-next-line no-undef
      mapTypeId: maptype,
      zoom: zoom,
      showLocateMeButton: false,
      showScalebar: false,
      showTrafficButton: false,
      showTermsLink: false,
      showZoomButtons: false,
      allowHidingLabelsOfRoad: true
    })
    // if ($('.labelToggle_Input')) {
    //   $('.labelToggle_Input').click()
    //   // $('.labelToggle_Input').remove()
    // }
    me._updateBingView()
    me.view.on('change:center', (e) => {
      me._updateBingView()
    })
    me.view.on('change:resolution', (e) => {
      me._updateBingView()
    })
  }

  _gcj02CorrectBing (lonlat) {
    const me = this
    if (!me.needGcj02Correct || me.backMap === BackMapType.BING_SATELLITE) {
      return lonlat
    }
    lonlat = wgs84togcj02(lonlat)
    return lonlat
  }

  _getBingMapTypeId (type) {
    let maptype = ''
    switch (type) {
      case BackMapType.BING_ROADMAP:
        // eslint-disable-next-line no-undef
        maptype = Microsoft.Maps.MapTypeId.road
        break
      case BackMapType.BING_SATELLITE:
        // eslint-disable-next-line no-undef
        maptype = Microsoft.Maps.MapTypeId.aerial
        break
    }
    return maptype
  }

  _updateBingView () {
    const me = this
    if (!me._isBing(me.backMap)) {
      return
    }
    let center = toLonLat(me.view.getCenter())
    center = me._gcj02CorrectBing(center)
    const zoom = me.view.getZoom()
    const maptype = me._getBingMapTypeId(me.backMap)
    // eslint-disable-next-line no-undef
    let haslabel = Microsoft.Maps.LabelOverlay.hidden
    if (me.backMap === BackMapType.BING_SATELLITE) {
      // eslint-disable-next-line no-undef
      haslabel = Microsoft.Maps.LabelOverlay.hidden
    } else if (me.backMap === BackMapType.BING_ROADMAP) {
      // eslint-disable-next-line no-undef
      haslabel = Microsoft.Maps.LabelOverlay.visible
    }
    // eslint-disable-next-line no-undef
    me.maps.bing.setView({
      // eslint-disable-next-line no-undef
      center: new Microsoft.Maps.Location(center[1], center[0]),
      zoom: zoom,
      // eslint-disable-next-line no-undef
      labelOverlay: haslabel
    })
    try {
      me.maps.bing.setMapType(maptype)
    } catch (error) {
      console.log('Bing地图不能为当前地区提供影像服务！可以强制使用网络代理解决此问题！')
    }
  }

  _setBackMapGaode () {
    const me = this
    if (window.__mapApiOK.gaode) {
      if (me.maps.gaode) {
        me.divs.gaode.show()
        me._updateGaodeView()
      } else {
        me._initGaodeMap()
      }
    } else {
      me._loadGaodeMapApi()
    }
  }

  _loadGaodeMapApi () {
    const me = this
    const url = 'https://webapi.amap.com/maps?v=1.4.15&key='
    $.getScript(url + MapKeys.gaode, () => {
      setTimeout(() => {
        me._initGaodeMap()
      }, 1000)
    })
  }

  _gcj02CorrectGaode (lonlat) {
    lonlat = wgs84togcj02(lonlat)
    return lonlat
  }

  _initGaodeMap () {
    const me = this
    window.__mapApiOK.gaode = true

    me.divs.gaode = $('<div>').attr('id', me.ids.gaode).appendTo($('#' + me.ids.bk)).addClass('fit-to-parent')

    // eslint-disable-next-line no-undef
    me.maps.gaodelayers.Standard = new AMap.TileLayer({
      visible: true,
      opacity: 1,
      zIndex: 0
    })
    // eslint-disable-next-line no-undef
    me.maps.gaodelayers.Satellite = new AMap.TileLayer.Satellite()
    // eslint-disable-next-line no-undef
    me.maps.gaodelayers.RoadNet = new AMap.TileLayer.RoadNet()
    // eslint-disable-next-line no-undef
    me.maps.gaodelayers.Traffic = new AMap.TileLayer.Traffic({
      autoRefresh: true,
      interval: 180
    })

    const center = toLonLat(me.view.getCenter())
    // center = me._gcj02CorrectGaode(center)
    const zoom = me.view.getZoom()
    // eslint-disable-next-line no-undef
    me.maps.gaode = new AMap.Map(me.ids.gaode, {
      layers: [
        me.maps.gaodelayers.Standard,
        me.maps.gaodelayers.Satellite,
        me.maps.gaodelayers.RoadNet,
        me.maps.gaodelayers.Traffic
      ],
      center: center,
      zoom: zoom,
      animateEnable: false
    })

    // eslint-disable-next-line no-undef
    me._updateGaodeView()
    // // updateGaodeView(control)
    me.view.on('change:center', (e) => {
      me._updateGaodeView()
    })
    me.view.on('change:resolution', (e) => {
      me._updateGaodeView()
    })
  }

  _updateGaodeView () {
    const me = this
    if (!me._isGaode(me.backMap)) {
      return
    }
    me.maps.gaodelayers.Standard.hide()
    me.maps.gaodelayers.Satellite.hide()
    me.maps.gaodelayers.RoadNet.hide()
    me.maps.gaodelayers.Traffic.hide()

    if (me.backMap === BackMapType.GAODE_STANDARD) {
      me.maps.gaodelayers.Standard.show()
    } else if (me.backMap === BackMapType.GAODE_SATELLITE) {
      me.maps.gaodelayers.Satellite.show()
    } else if (me.backMap === BackMapType.GAODE_ROADNET) {
      me.maps.gaodelayers.RoadNet.show()
    } else if (me.backMap === BackMapType.GAODE_TRAFFIC) {
      me.maps.gaodelayers.Traffic.show()
      me.maps.gaodelayers.Standard.show()
    } else if (me.backMap === BackMapType.GAODE_ROADNET_SATELLITE) {
      me.maps.gaodelayers.RoadNet.show()
      me.maps.gaodelayers.Satellite.show()
    }
    const center = me._gcj02CorrectGaode(toLonLat(me.view.getCenter()))
    // const center = toLonLat(me.view.getCenter())
    const zoom = me.view.getZoom()
    // eslint-disable-next-line no-undef
    me.maps.gaode.setZoom(zoom)
    me.maps.gaode.setCenter(center)
  }

  _setBackMapGoogle () {
    const me = this
    if (window.__mapApiOK.google) {
      if (me.maps.google) {
        me.divs.google.show()
        me._updateGoogleView()
      } else {
        me._initGoogleMap()
      }
    } else {
      me._loadGoogleMapApi()
    }
  }

  _loadGoogleMapApi () {
    const me = this
    const url = 'https://maps.googleapis.com/maps/api/js?key='
    $.getScript(url + MapKeys.google, () => {
      setTimeout(() => {
        me._initGoogleMap()
      }, 1000)
    })
  }

  _updateGoogleView () {
    const me = this
    if (!me._isGoogle(me.backMap)) {
      return
    }
    const center = me._gcj02CorrectGoogle(toLonLat(me.view.getCenter()))
    const zoom = me.view.getZoom()
    // eslint-disable-next-line no-undef
    const myLatlng = new google.maps.LatLng(center[1], center[0])
    me.maps.google.setMapTypeId(me._getGoogleMapTypeId())
    me.maps.google.setCenter(myLatlng)
    me.maps.google.setZoom(zoom)
  }

  _gcj02CorrectGoogle (lonlat) {
    const me = this
    if (!me.needGcj02Correct || me.backMap === BackMapType.GOOGLE_SATELLITE) {
      return lonlat
    }
    lonlat = wgs84togcj02(lonlat)
    return lonlat
  }

  _getGoogleMapTypeId () {
    const me = this
    let maptype = ''
    if (me.backMap === BackMapType.GOOGLE_SATELLITE) {
      maptype = 'satellite'
    } else if (me.backMap === BackMapType.GOOGLE_ROADMAP) {
      maptype = 'roadmap'
    } else if (me.backMap === BackMapType.GOOGLE_TERRAIN) {
      maptype = 'terrain'
    } else if (me.backMap === BackMapType.GOOGLE_HYBRID) {
      maptype = 'hybrid'
    }
    return maptype
  }

  _initGoogleMap () {
    const me = this
    window.__mapApiOK.google = true

    me.divs.google = $('<div>').attr('id', me.ids.google).appendTo($('#' + me.ids.bk)).addClass('fit-to-parent').addClass('bk_google')

    const center = me._gcj02CorrectGoogle(toLonLat(me.view.getCenter()))
    const zoom = me.view.getZoom()
    // eslint-disable-next-line no-undef
    const myLatlng = new google.maps.LatLng(center[1], center[0])
    const maptype = me._getGoogleMapTypeId()
    const mapOptions = {
      zoom: zoom,
      center: myLatlng,
      mapTypeId: maptype
    }
    // eslint-disable-next-line no-undef
    me.maps.google = new google.maps.Map(document.getElementById(me.ids.google), mapOptions)

    me.view.on('change:center', (e) => {
      me._updateGoogleView()
    })
    me.view.on('change:resolution', (e) => {
      me._updateGoogleView()
    })
  }

  _isGoogle (bktype) {
    return bktype === BackMapType.GOOGLE_HYBRID ||
      bktype === BackMapType.GOOGLE_ROADMAP ||
      bktype === BackMapType.GOOGLE_SATELLITE ||
      bktype === BackMapType.GOOGLE_TERRAIN
  }

  _isGaode (bktype) {
    return bktype === BackMapType.GAODE_ROADNET ||
      bktype === BackMapType.GAODE_ROADNET_SATELLITE ||
      bktype === BackMapType.GAODE_SATELLITE ||
      bktype === BackMapType.GAODE_STANDARD ||
      bktype === BackMapType.GAODE_TRAFFIC
  }

  _isQQ (bktype) {
    return bktype === BackMapType.QQ_ROAD ||
      bktype === BackMapType.QQ_ROAD_SATELLITE ||
      bktype === BackMapType.QQ_SATELLITE ||
      bktype === BackMapType.QQ_TRAFFIC
  }

  _isTianditu (bktype) {
    return bktype === BackMapType.TIANDITU_HYBRID_MAP ||
      bktype === BackMapType.TIANDITU_NORMAL_MAP ||
      bktype === BackMapType.TIANDITU_SATELLITE_MAP ||
      bktype === BackMapType.TIANDITU_TERRAIN_HYBRID_MAP ||
      bktype === BackMapType.TIANDITU_TERRAIN_MAP
  }

  _isBing (bktype) {
    return bktype === BackMapType.BING_ROADMAP ||
      bktype === BackMapType.BING_SATELLITE
  }
}

export default MapControl
