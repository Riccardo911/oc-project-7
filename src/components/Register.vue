<template>
  <section class="register-box">
    <form>
        <div class="register-form">
            <div class="center">
                <h3>register</h3>

                <div class="form-group">
                    <label></label>
                    <input type="email" class="form-control" placeholder="Email" required />
                </div>

                <div class="form-group">
                    <label></label>
                    <input type="password" class="form-control" placeholder="Password" required />
                </div>

                <input type="submit" value="register">

                <div class="register_link">
                    Not a member? <a href="#">Register</a>
                </div>
            </div>
        </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "register-form",
};
</script>

<style>
    .register-box{
        /* border: 1px solid black; */
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 250px;
        margin-top: 250px;
    }

    .register-form{
        border: 1px solid black;
        border-radius: 10px;
        width: 100%;
        height: 300px;
        background-color: #333;
        color: white;
        padding: 60px;
    }

    .center h3{
        text-align: center;
        padding: 0 0 20px 0;
        border-bottom: 1px solid ;
    }

    .form-group {
        padding:15px;
        box-sizing: border-box;
        text-align: center;
    }

    input[type="submit"]{
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border: 2px solid white;
        background: green;
        color: white;
        border-radius: 10px;
    }

    input[type="submit"]:hover{
        border-color: aqua;
        transition: 0.8s;
    }

    .register_link{
        margin-top: 30px;
        text-align: center;
    }

    .register_link a{
        color:aqua;
        text-decoration: none;
    }

    .register_link a:hover{
        text-decoration: underline;
    }

</style>
