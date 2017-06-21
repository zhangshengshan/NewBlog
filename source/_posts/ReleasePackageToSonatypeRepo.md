---
title: ReleasePackageToSonatypeRepo
date: 2017-06-21 13:24:54
tags: maven 
---


# maven工程构件发布到Maven中央仓库

[参考文档](http://central.sonatype.org/pages/apache-maven.html#gpg-signed-components)
pom.xml 示例
```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>io.github.zhangshengshan</groupId>
  <artifactId>zss</artifactId>
  <packaging>jar</packaging>
  <version>3.0</version>

  <name>my-app</name>
  <description>a package which implements some machine learing methods</description>
  <url>http://github.zhangshengshan.ig</url>
  <scm>
    <connection>scm:git:https://github.com/zhangshengshan/com.zhangshengshan.git</connection>
    <developerConnection>scm:git:https://github.com/zhangshengshan/com.zhangshengshan.git</developerConnection>
    <tag>HEAD</tag>
    <url>http://io.github.zhangshengshan</url>
  </scm>

    <licenses>
      <license>
        <name>Apache License, Version 2.0</name>
        <url>https://www.apache.org/licenses/LICENSE-2.0.txt</url>
        <distribution>repo</distribution>
        <comments>A business-friendly OSS license</comments>
      </license>
    </licenses>

  <developers>
    <developer>
      <id>zhangshengshan</id>
      <name>zhangshengshan</name>
      <email>alphabetago@163.com</email>
      <url>http://github.zhangshengshan.io</url>
      <organization>youzan</organization>
      <organizationUrl>http://www.youzan.com</organizationUrl>
      <roles>
        <role>architect</role>
        <role>developer</role>
      </roles>
      <timezone>China/Beijing</timezone>
      <properties>
        <picUrl>http://www.example.com/jdoe/pic</picUrl>
      </properties>
    </developer>
  </developers>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

<build>
  <plugins>
    <plugin>
      <groupId>org.sonatype.plugins</groupId>
      <artifactId>nexus-staging-maven-plugin</artifactId>
      <version>1.6.7</version>
      <extensions>true</extensions>
      <configuration>
         <serverId>ossrh</serverId>
         <nexusUrl>https://oss.sonatype.org/</nexusUrl>
         <!--<autoReleaseAfterClose>true</autoReleaseAfterClose>-->
      </configuration>
    </plugin>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-gpg-plugin</artifactId>
      <version>1.5</version>
      <executions>
        <execution>
          <id>sign-artifacts</id>
          <phase>verify</phase>
          <goals>
            <goal>sign</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-source-plugin</artifactId>
      <version>2.2.1</version>
      <executions>
        <execution>
          <id>attach-sources</id>
          <goals>
            <goal>jar-no-fork</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-javadoc-plugin</artifactId>
      <version>2.9.1</version>
      <executions>
        <execution>
          <id>attach-javadocs</id>
          <goals>
            <goal>jar</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>

<distributionManagement>
  <snapshotRepository>
    <id>ossrh</id>
    <url>https://oss.sonatype.org/content/repositories/snapshots</url>
  </snapshotRepository>
</distributionManagement>

<!--<distributionManagement>-->
  <!--<snapshotRepository>-->
    <!--<id>ossrh</id>-->
    <!--<url>https://oss.sonatype.org/content/repositories/snapshots</url>-->
  <!--</snapshotRepository>-->
  <!--<repository>-->
    <!--<id>ossrh</id>-->
    <!--<url>https://oss.sonatype.org/service/local/staging/deploy/maven2/</url>-->
  <!--</repository>-->
<!--</distributionManagement>-->
</project>

```



# SBT工程构件发布到Maven中央仓库

[参考文档](http://central.sonatype.org/pages/sbt.html#deploying-to-ossrh-with-sbt-introduction)

build.sbt示例
```
addSbtPlugin("org.xerial.sbt" % "sbt-sonatype" % "1.1")

useGpg := true
organization := "io.github.zhangshengshan"
name := "sbtSonatype"
version := "5.0.1"
scalaVersion := "2.10.6"

licenses := Seq("BSD-style" -> url("http://www.opensource.org/licenses/bsd-license.php"))
homepage := Some(url("http://example.com"))
scmInfo := Some(
  ScmInfo(
    url("https://github.com/your-account/your-project"),
    "scm:git@github.com:your-account/your-project.git"
  )
)
developers := List(
  Developer(
    id    = "Your identifier",
    name  = "Your Name",
    email = "your@email",
    url   = url("http://your.url")
  )
)

pomIncludeRepository := { _ => false }
publishMavenStyle := true

publishTo := {
  val nexus = "https://oss.sonatype.org/"
  if (isSnapshot.value)
    Some("snapshots" at nexus + "content/repositories/snapshots")
  else
    Some("releases"  at nexus + "service/local/staging/deploy/maven2")
}
publishArtifact in Test:= false
```
